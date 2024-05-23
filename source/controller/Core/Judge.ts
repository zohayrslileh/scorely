import JudgeEntity from "@/Models/Database/Entities/Judge"
import CoreException from "./Exception"
import { Like } from "typeorm"
import zod from "zod"

/*
|-----------------------------
|  Judge
|-----------------------------
|
| 
*/
export default class Judge {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Name
     * 
     */
    public name: string

    /**
     * Constructor method
     * 
     */
    private constructor(primitiveJudge: PrimitiveJudge) {

        // Set id
        this.id = primitiveJudge.id

        // Set name
        this.name = primitiveJudge.name
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(data: unknown) {

        // Schema
        const schema = zod.object({
            name: zod.string().max(50)
        })

        // Validate data
        const { name } = schema.parse(data)

        // Create entity
        const entity = new JudgeEntity

        // Set name
        entity.name = name

        // Save
        await entity.save()

        return new this(entity)
    }

    /**
     * Record method
     * 
     * @returns
     */
    public static async record(data: unknown) {

        // Schema
        const schema = zod.object({
            name: zod.string().max(50).optional()
        })

        // Validate data
        const { name } = schema.parse(data)

        // Get entities
        const entities = await JudgeEntity.find({
            where: { name: Like(`%${name}%`) },
            order: { id: "DESC" },
            take: 20
        })

        return entities.map(entity => new this(entity))
    }

    /**
     * Find method
     * 
     * @returns
     */
    public static async find(id: unknown) {

        // Schema
        const schema = zod.number()

        // Get entity
        const entity = await JudgeEntity.findOneBy({ id: schema.parse(id) })

        // Check entity
        if (!entity) throw new CoreException("Judge entity was not found")

        return new this(entity)
    }

    /**
     * Update method
     * 
     * @returns
     */
    public async update(data: unknown) {

        // Schema
        const schema = zod.object({
            name: zod.string().max(50)
        })

        // Validate data
        const { name } = schema.parse(data)

        // Set name
        this.name = name

        // Get entity
        const entity = await JudgeEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Judge entity was not found")

        // Set name
        entity.name = name

        // Save
        await entity.save()

        return this
    }

    /**
     * Delete method
     * 
     * @returns
     */
    public async delete() {

        // Get entity
        const entity = await JudgeEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Judge entity was not found")

        await entity.remove()
    }

}

/**
 * Primitive
 * 
 */
export interface PrimitiveJudge {
    id: number
    name: string
}