import Participant, { PrimitiveParticipant } from "./Participant"
import request from "@/Models/Server/Request"
import zod from "zod"
import Judge, { PrimitiveJudge } from "./Judge"

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

    /**
     * Add participant method
     * 
     * @returns
     */
    public async addParticipant(participant: Participant) {

        // Add participant
        await request({
            method: "POST",
            url: `/session/${this.id}/${participant.id}`
        })
    }

    /**
     * Remove participant method
     * 
     * @returns
     */
    public async removeParticipant(participant: Participant) {

        // Add participant
        await request({
            method: "DELETE",
            url: `/session/${this.id}/${participant.id}`
        })
    }

    /**
     * Participants method
     * 
     * @returns
     */
    public async participants() {

        // Participants
        const participants = await request<PrimitiveParticipant[]>({ url: `/session/${this.id}/participants` })

        return participants.map(primitiveParticipant => new Participant(primitiveParticipant))
    }

    /**
     * Judges method
     * 
     * @returns
     */
    public async judges() {

        // Judges
        const judges = await request<PrimitiveJudge[]>({ url: `/session/${this.id}/judges` })

        return judges.map(primitiveJudge => new Judge(primitiveJudge))
    }

    /**
     * Export excel method
     * 
     * @returns
     */
    public async exportExcel() {

        return await request<ArrayBuffer>({ url: `/session/${this.id}/export`, responseType: "arraybuffer" })
    }

}

/**
 * Primitive
 * 
 */
export interface PrimitiveSession {
    id: number
}