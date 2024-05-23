import PendingException from "@/View/Exception/Exceptions/Pending"
import Authentication from "@/Core/Authentication"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import styled from "@emotion/styled"
import { AxiosError } from "axios"
import Content from "./Content"
import Navbar from "./Navbar"

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
    if (unauthorized) return <Navigate to="/auth" />

    // Exception status
    if (user.exception) return <Throw exception={user.exception.current} />

    // Authorized status
    return <Container>

        <Authentication.context.Provider value={user.solve}>

            {/** Navbar */}
            <Navbar />

            {/** Content */}
            <Content />

        </Authentication.context.Provider>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid; 
    grid-template-columns: auto 1fr; 
    grid-template-rows: auto 1fr; 
    gap: 10px; 
    grid-template-areas: 
        "navbar navbar"
        "content content";
`