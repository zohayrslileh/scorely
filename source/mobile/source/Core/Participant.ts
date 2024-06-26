import request from "@/Models/Server/Request"
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

        // Create participant
        const participant = await request<PrimitiveParticipant>({
            method: "POST",
            url: "/participant",
            data: schema.parse(data)
        })

        return new this(participant)
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

        // Get participants
        const participants = await request<PrimitiveParticipant[]>({ url: "/participant", params: schema.parse(data) })

        return participants.map(participant => new this(participant))
    }

    /**
     * Find method
     * 
     * @returns
     */
    public static async find(id: unknown) {

        // Schema
        const schema = zod.number()

        // Get participant
        const participant = await request<PrimitiveParticipant>({ url: `/participant/${schema.parse(id)}` })

        return new this(participant)
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

        // Update participant
        await request<PrimitiveParticipant>({
            method: "POST",
            url: `/participant/${this.id}`,
            data: { name, club }
        })

        return this
    }

    /**
     * Delete method
     * 
     * @returns
     */
    public async delete() {

        await request({ method: "DELETE", url: `/participant/${this.id}` })
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