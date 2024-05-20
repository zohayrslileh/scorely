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
     * Constructor method
     * 
     */
    public constructor(id: unknown) {

        // Schema
        const schema = zod.number()

        // Validate and set id
        this.id = schema.parse(id)
    }

    /**
     * Read method
     * 
     * @returns
     */
    public async read() {

        return await request<PrimitiveParticipant>({ url: `/participant/${this.id}` })
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

        return new this(participant.id)
    }

}

/**
 * Primitive Participant
 * 
 */
interface PrimitiveParticipant {
    id: number
}