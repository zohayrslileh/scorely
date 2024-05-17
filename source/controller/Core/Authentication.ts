import UnauthorizedException from "@/Core/Exception/Unauthorized"
import User from "@/Models/Database/Entities/User"
import zod from "zod"

/*
|-----------------------------
|  Authentication
|-----------------------------
| 
|
*/
export default class Authentication {

    /**
     * Token
     * 
     */
    private token: string | undefined

    /**
     * Constructor method
     * 
     */
    public constructor(token: unknown) {

        // Schema
        const schema = zod.string().optional()

        // Validate and set token
        this.token = schema.parse(token)
    }

    /**
     * Login method
     * 
     * @returns
     */
    public async login(data: unknown): Promise<string> {

        // Schema
        const schema = zod.object({
            username: zod.string().max(50),
            password: zod.string().max(50)
        })

        // Validate data
        const { username, password } = schema.parse(data)

        // Get user
        const user = await User.findOneBy({ username })

        // Check username and password
        if (!user || !await user.verifyPassword(password)) throw new UnauthorizedException("Username or password incorrect")

        // Create and set token
        this.token = user.createToken()

        return this.token
    }

    /**
     * Verify method
     * 
     * @returns
     */
    public async verify(): Promise<User> {

        // Check token
        if (!this.token) throw new UnauthorizedException

        // Get user
        const user = await User.findByToken(this.token)

        // Check user
        if (!user) throw new UnauthorizedException

        return user
    }
}