import styled from "@emotion/styled"
import Content from "./Content"
import Footer from "./Footer"

/**
 * Structure
 * 
 * @returns 
 */
export default function () {

    return <Container>

        {/** Content */}
        <Content />

        {/** Footer */}
        <Footer />

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 100px;
`