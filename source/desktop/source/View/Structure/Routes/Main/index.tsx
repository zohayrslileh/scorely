import PendingException from "@/View/Exception/Exceptions/Pending"
import Authentication from "@/Core/Authentication"
import Authorization from "@/Models/Authorization"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import styled from "@emotion/styled"
import { AxiosError } from "axios"
import { useMemo } from "react"

/**
 * Main
 * 
 * @returns 
 */
export default function () {

    /**
     * Authentication
     * 
     */
    const authentication = useMemo(() => new Authentication(Authorization.value), [])

    /**
     * User
     * 
     */
    const user = authentication.useVerify()

    // Pending status
    if (user.pending) return <Throw exception={new PendingException} />

    // Unauthorized status
    if (
        user.exception
        && user.exception.current instanceof AxiosError
        && user.exception.current.response?.status === 401
    ) return <Navigate to="auth" />

    // Exception status
    if (user.exception) return <Throw exception={user.exception.current} />

    return <Container>

        <h1>Main {user.solve.id}</h1>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`