import { BrowserRouter } from "react-router-dom"
import styled from "@emotion/styled"
import Content from "./Content"
import Footer from "./Footer"

/**
 * Structure
 * 
 * @returns 
 */
export default function () {

    /**
     * Browser Router
     * 
     */
    return <BrowserRouter>

        <Container>

            {/** Content */}
            <Content />

            {/** Footer */}
            <Footer />

        </Container>

    </BrowserRouter>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;
    box-sizing: border-box;
    gap: 10px;
    padding: 10px;
`