import Authorization from "@/Models/Authorization"
import request from "@/Models/Server/Request"
import usePromise from "@/Tools/Promise"

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
    public constructor(token?: string) {

        // Set token
        this.token = token
    }

    /**
     * Login method
     * 
     * @returns
     */
    public async login(data: unknown) {

        // Response
        type Response = { token: string }

        // Ask response
        const response = await request<Response>({ method: "POST", url: "/auth/login", data })

        // Set token
        this.token = response.token

        // Save authorization
        Authorization.value = this.token
    }

    /**
     * Verify method
     * 
     * @returns
     */
    public async verify() {

        // Response
        type Response = { id: number }

        // Ask response
        const response = await request<Response>({ method: "POST", url: "/auth" })

        return response
    }

    /**
     * Use verify method
     * 
     * @returns
     */
    public useVerify() {

        return usePromise(this.verify, [])
    }
}