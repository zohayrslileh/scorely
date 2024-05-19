import Authentication from "@/Core/Authentication"
import { useNavigate } from "react-router-dom"
import Card from "@/View/Components/Card"
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

    return <Container className="animation">
        <button onClick={logout}>Logout</button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: navbar;
`