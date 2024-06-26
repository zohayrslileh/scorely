import Authorization from "@/Models/Authorization"
import request from "@/Models/Server/Request"
import usePromise from "@/Tools/Promise"
import { createContext } from "react"

/*
|-----------------------------
|  Authentication
|-----------------------------
| 
|
*/
export default class Authentication {

    /**
     * Context
     * 
     */
    public static readonly context = createContext<PrimitiveUser | undefined>(undefined)

    /**
     * Login method
     * 
     * @returns
     */
    public static async login(data: unknown) {

        // Response
        type Response = { token: string }

        // Ask response
        const response = await request<Response>({ method: "POST", url: "/auth/login", data })

        // Set authorization
        Authorization.value = response.token

        return response
    }

    /**
     * Logout method
     * 
     * @returns
     */
    public static logout() {

        Authorization.value = ""
    }

    /**
     * Use login method
     * 
     * @returns
     */
    public static useLogin(data: unknown) {

        return usePromise(async () => await this.login(data))
    }

    /**
     * Verify method
     * 
     * @returns
     */
    public static async verify() {

        // Ask response
        const response = await request<PrimitiveUser>({ method: "POST", url: "/auth" })

        return response
    }

    /**
     * Use verify method
     * 
     * @returns
     */
    public static useVerify() {

        return usePromise(this.verify, [])
    }
}

/**
 * Primitive User
 * 
 */
interface PrimitiveUser {
    id: number
    username: string
}