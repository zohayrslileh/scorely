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
    public readonly name: string

    /**
     * Constructor method
     * 
     */
    private constructor(primitiveParticipant: PrimitiveParticipant) {

        // Set id
        this.id = primitiveParticipant.id

        // Set name
        this.name = primitiveParticipant.name
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

        // Create participant
        const participant = await request<PrimitiveParticipant>({ method: "POST", url: "/participant", data: schema.parse(data) })

        return new this(participant)
    }

    /**
     * Record method
     * 
     * @returns
     */
    public static async record() {

        // Get participant
        const participants = await request<PrimitiveParticipant[]>({ url: "/participant" })

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

        // Get entity
        const entity = await request<PrimitiveParticipant>({ url: `/participant/${schema.parse(id)}` })

        return new this(entity)
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
}