import request from "@/Models/Server/Request"
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

        // Create session
        const session = await request<PrimitiveSession>({
            method: "POST",
            url: "/session"
        })

        return new this(session)
    }

    /**
     * Record method
     * 
     * @returns
     */
    public static async record() {

        // Get sessions
        const sessions = await request<PrimitiveSession[]>({ url: "/session" })

        return sessions.map(session => new this(session))
    }

    /**
     * Find method
     * 
     * @returns
     */
    public static async find(id: unknown) {

        // Schema
        const schema = zod.number()

        // Get session
        const session = await request<PrimitiveSession>({ url: `/session/${schema.parse(id)}` })

        return new this(session)
    }

    /**
     * Update method
     * 
     * @returns
     */
    public async update() {

        // Update session
        await request<PrimitiveSession>({
            method: "POST",
            url: `/session/${this.id}`
        })

        return this
    }

    /**
     * Delete method
     * 
     * @returns
     */
    public async delete() {

        await request({ method: "DELETE", url: `/session/${this.id}` })
    }

}

/**
 * Primitive
 * 
 */
export interface PrimitiveSession {
    id: number
}