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
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
`