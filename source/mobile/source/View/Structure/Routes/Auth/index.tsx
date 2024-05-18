import PendingException from "@/View/Exception/Exceptions/Pending"
import Authentication from "@/Core/Authentication"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import { AxiosError } from "axios"
import Login from "./Login"

/**
 * Auth
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = Authentication.useVerify()

    /**
     * Unauthorized
     * 
     */
    const unauthorized = user.exception && user.exception.current instanceof AxiosError && user.exception.current.response?.status === 401

    // Pending status
    if (user.pending) return <Throw exception={new PendingException} />

    // Unauthorized status
    if (unauthorized) return <Login />

    // Exception status
    if (user.exception) return <Throw exception={user.exception.current} />

    // Authorized status
    return <Navigate to="/" />
}