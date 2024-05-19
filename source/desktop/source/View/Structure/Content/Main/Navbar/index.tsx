import Authentication from "@/Core/Authentication"
import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { useCallback } from "react"

/**
 * Navbar
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    /**
     * Logout method
     * 
     * @returns
     */
    const logout = useCallback(function () {

        Authentication.logout()

        navigate("/auth")

    }, [])

    return <Container>
        <button onClick={logout}>Logout</button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    grid-area: navbar;
    border: 2px solid;
`