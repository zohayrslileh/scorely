import PendingException from "@/View/Exception/Exceptions/Pending"
import Authentication from "@/Core/Authentication"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import styled from "@emotion/styled"
import { AxiosError } from "axios"
import Content from "./Content"
import Sidebar from "./Sidebar"
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

        {/** Navbar */}
        <Navbar />

        {/** Sidebar */}
        <Sidebar />

        {/** Content */}
        <Content />

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid; 
    grid-auto-columns: 1fr; 
    grid-template-columns: 0.3fr 1.7fr; 
    grid-template-rows: 0.2fr 1.8fr; 
    gap: 0px 0px; 
    grid-template-areas: 
        "sidebar navbar"
        "sidebar content"; 
`