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
const Container = styled.div`
    grid-area: sidebar;
    border: 2px solid;

    > #logo {
        margin: 10px;
    }
`