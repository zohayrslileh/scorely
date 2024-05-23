import ParticipantEntity from "@/Models/Database/Entities/Participant"
import CoreException from "./Exception"
import { Like } from "typeorm"
import zod from "zod"

/*
|-----------------------------
|  Participant
|-----------------------------
|
| 
*/
export default class Participant {

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
     * Club
     * 
     */
    public club: string | null

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveParticipant: PrimitiveParticipant) {

        // Set id
        this.id = primitiveParticipant.id

        // Set name
        this.name = primitiveParticipant.name

        // Set club
        this.club = primitiveParticipant.club
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
            club: zod.string().max(50).nullable()
        })

        // Validate data
        const { name, club } = schema.parse(data)

        // Create entity
        const entity = new ParticipantEntity

        // Set name
        entity.name = name

        // Set club
        entity.club = club

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
        const entities = await ParticipantEntity.find({
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
        const entity = await ParticipantEntity.findOneBy({ id: schema.parse(id) })

        // Check entity
        if (!entity) throw new CoreException("Participant entity was not found")

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
            name: zod.string().max(50),
            club: zod.string().max(50).nullable()
        })

        // Validate data
        const { name, club } = schema.parse(data)

        // Set name
        this.name = name

        // Set club
        this.club = club

        // Get entity
        const entity = await ParticipantEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Participant entity was not found")

        // Set name
        entity.name = name

        // Set club
        entity.club = club

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
        const entity = await ParticipantEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Participant entity was not found")

        await entity.remove()
    }

}

/**
 * Primitive
 * 
 */
export interface PrimitiveParticipant {
    id: number
    name: string
    club: string | null
}