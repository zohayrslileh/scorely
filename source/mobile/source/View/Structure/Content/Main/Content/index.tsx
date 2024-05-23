import Exception from "@/View/Exception"
import styled from "@emotion/styled"
import Socket from "./Socket"

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <Container>

        <Exception>

            <Socket />

        </Exception>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    grid-area: content;
    position: relative;
    overflow: auto;
    display: grid;
`