import Authentication from "@/Core/Authentication"
import { useNavigate } from "react-router-dom"
import Card from "@/View/Components/Card"
import styled from "@emotion/styled"
import { useCallback } from "react"
import Navigator from "./Navigator"

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
        <Navigator />
        <button onClick={logout}>Logout</button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: navbar;
    display: flex;
    align-items: center;
    justify-content: space-between;
`