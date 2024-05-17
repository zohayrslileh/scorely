import PendingException from "@/View/Exception/Exceptions/Pending"
import Authentication from "@/Core/Authentication"
import Authorization from "@/Models/Authorization"
import { Throw } from "@/Tools/Exception"
import styled from "@emotion/styled"
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

    // Pending state
    if (user.pending) return <Throw exception={new PendingException} />

    // Exception state
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