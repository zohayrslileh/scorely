import ParticipantEntity from "@/Models/Database/Entities/Participant"
import SessionEntity from "@/Models/Database/Entities/Session"
import CoreException from "./Exception"
import Participant from "./Participant"
import zod from "zod"

/*
|-----------------------------
|  Session
|-----------------------------
|
| 
*/
export default class Session {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Constructor method
     * 
     */
    private constructor(primitiveSession: PrimitiveSession) {

        // Set id
        this.id = primitiveSession.id
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create() {

        // Create entity
        const entity = new SessionEntity

        // Save
        await entity.save()

        return new this(entity)
    }

    /**
     * Record method
     * 
     * @returns
     */
    public static async record() {

        // Get entities
        const entities = await SessionEntity.find({
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
        const entity = await SessionEntity.findOneBy({ id: schema.parse(id) })

        // Check entity
        if (!entity) throw new CoreException("Session entity was not found")

        return new this(entity)
    }

    /**
     * Update method
     * 
     * @returns
     */
    public async update() {

        // Get entity
        const entity = await SessionEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Session entity was not found")

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
        const entity = await SessionEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Session entity was not found")

        await entity.remove()
    }

    /**
     * Add participant method
     * 
     * @returns
     */
    public async addParticipant(participant: Participant) {

        // Get session entity
        const sessionEntity = await SessionEntity.findOne({
            relations: { participants: true },
            where: { id: this.id }
        })

        // Check session entity
        if (!sessionEntity) throw new CoreException("Session entity was not found")

        // Get participant entity
        const participantEntity = await ParticipantEntity.findOneBy({ id: participant.id })

        // Check participant entity
        if (!participantEntity) throw new CoreException("Participant entity was not found")

        // Add participant entity to session entity
        sessionEntity.participants.push(participantEntity)

        // Save
        await sessionEntity.save()
    }

}

/**
 * Primitive
 * 
 */
export interface PrimitiveSession {
    id: number
}