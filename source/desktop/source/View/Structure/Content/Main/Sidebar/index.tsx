import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import styled from "@emotion/styled"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <Container className="animation">
        <Logo width={150} id="logo" />
        <Menu />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: sidebar;
    background-color: pink;
    display: grid;
    grid-template-rows: auto 1fr;

    > #logo {
        margin: 10px;
    }
`