import Card from "@/View/Components/Card"
import styled from "@emotion/styled"
import Language from "./Language"
import Connect from "./Connect"
import Theme from "./Theme"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container className="animation">
        <Theme />
        <Connect />
        <Language />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
`