import Logo from "@/View/Components/Logo"
import styled from "@emotion/styled"

/**
 * Welcome
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Logo width={250} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    height: 100%;
`