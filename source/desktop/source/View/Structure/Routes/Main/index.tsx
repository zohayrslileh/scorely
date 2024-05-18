import PendingException from "@/View/Exception/Exceptions/Pending"
import Authentication from "@/Core/Authentication"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import { AxiosError } from "axios"

/**
 * Main
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
    if (unauthorized) return <Navigate to="auth" />

    // Exception status
    if (user.exception) return <Throw exception={user.exception.current} />

    // Authorized status
    return <h1>Main {user.solve.id}</h1>
}