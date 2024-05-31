import JudgeEntity from "@/Models/Database/Entities/Judge"
import User from "@/Models/Database/Entities/User"
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
     * Primary
     * 
     */
    public primary: boolean

    /**
     * Username
     * 
     */
    public username: string

    /**
     * Password
     * 
     */
    public password: string | undefined

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveJudge: PrimitiveJudge) {

        // Set id
        this.id = primitiveJudge.id

        // Set name
        this.name = primitiveJudge.name

        // Set primary
        this.primary = primitiveJudge.primary

        // Set username
        this.username = primitiveJudge.username

        // Set password
        this.password = primitiveJudge.password
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(data: unknown) {

        // Schema
        const schema = zod.object({
            name: zod.string().max(50),
            username: zod.string().max(50),
            password: zod.string().max(50)
        })

        // Validate data
        const { name, username, password } = schema.parse(data)

        // Create entity
        const entity = new JudgeEntity

        // Set name
        entity.name = name

        // Set user
        entity.user = new User

        // Set username
        entity.user.username = username

        // Set password
        await entity.user.setPassword(password)

        // Save user
        await entity.user.save()

        // Save
        await entity.save()

        return new this({
            id: entity.id,
            name: entity.name,
            primary: entity.primary,
            username: entity.user.username,
            password: undefined
        })
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
            relations: { user: true },
            order: { id: "DESC" },
            take: 20,
        })

        return entities.map(entity => new this({
            id: entity.id,
            name: entity.name,
            primary: entity.primary,
            username: entity.user.username,
            password: undefined
        }))
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
        const entity = await JudgeEntity.findOne({
            where: { id: schema.parse(id) },
            relations: { user: true }
        })

        // Check entity
        if (!entity) throw new CoreException("Judge entity was not found")

        return new this({
            id: entity.id,
            name: entity.name,
            primary: entity.primary,
            username: entity.user.username,
            password: undefined
        })
    }

    /**
     * Update method
     * 
     * @returns
     */
    public async update(data: unknown) {

        // Schema
        const schema = zod.object({
            name: zod.string().max(50),
            username: zod.string().max(50),
            password: zod.string().max(50).optional()
        })

        // Validate data
        const { name, username, password } = schema.parse(data)

        // Set name
        this.name = name

        // Get entity
        const entity = await JudgeEntity.findOne({
            where: { id: this.id },
            relations: { user: true }
        })

        // Check entity
        if (!entity) throw new CoreException("Judge entity was not found")

        // Set name
        entity.name = name

        // Set username
        entity.user.username = username

        // Set password
        if (password) await entity.user.setPassword(password)

        // Save user
        await entity.user.save()

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
        const entity = await JudgeEntity.findOne({
            where: { id: this.id },
            relations: { user: true }
        })

        // Check entity
        if (!entity) throw new CoreException("Judge entity was not found")

        // Remove entity
        await entity.remove()

        // Remove user
        await entity.user.remove()
    }

}

/**
 * Primitive
 * 
 */
export interface PrimitiveJudge {
    id: number
    name: string
    primary: boolean
    username: string
    password: string | undefined
}