import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import styled from "@emotion/styled"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Logo width={150} id="logo" />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: sidebar;

    > #logo {
        margin: 10px;
    }
`