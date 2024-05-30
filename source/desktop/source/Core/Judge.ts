import request from "@/Models/Server/Request"
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
     * Is online
     * 
     */
    public isOnline?: boolean

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveJudge: PrimitiveJudge) {

        // Set id
        this.id = primitiveJudge.id

        // Set name
        this.name = primitiveJudge.name

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

        // Create judge
        const judge = await request<PrimitiveJudge>({
            method: "POST",
            url: "/judge",
            data: schema.parse(data)
        })

        return new this(judge)
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

        // Get judges
        const judges = await request<PrimitiveJudge[]>({ url: "/judge", params: schema.parse(data) })

        return judges.map(judge => new this(judge))
    }

    /**
     * Find method
     * 
     * @returns
     */
    public static async find(id: unknown) {

        // Schema
        const schema = zod.number()

        // Get judge
        const judge = await request<PrimitiveJudge>({ url: `/judge/${schema.parse(id)}` })

        return new this(judge)
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

        // Set username
        this.username = username

        // Set password
        this.password = password

        // Update judge
        await request<PrimitiveJudge>({
            method: "POST",
            url: `/judge/${this.id}`,
            data: { name, username, password }
        })

        return this
    }

    /**
     * Delete method
     * 
     * @returns
     */
    public async delete() {

        await request({ method: "DELETE", url: `/judge/${this.id}` })
    }

}

/**
 * Primitive
 * 
 */
export interface PrimitiveJudge {
    id: number
    name: string
    username: string
    password: string | undefined
}