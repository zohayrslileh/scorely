import { Route, Routes } from "react-router-dom"
import styled from "@emotion/styled"
import { lazy } from "react"

const Home = lazy(() => import("./Home"))

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <Container>

        <Routes>
            <Route index element={<Home />} />
        </Routes>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    grid-area: content;
    border: 2px solid;
`