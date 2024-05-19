import { Route, Routes } from "react-router-dom"
import Card from "@/View/Components/Card"
import Exception from "@/View/Exception"
import styled from "@emotion/styled"
import { lazy } from "react"

const Home = lazy(() => import("./Home"))

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <Container className="animation">

        <Exception>

            <Routes>
                <Route index element={<Home />} />
            </Routes>

        </Exception>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: content;
    position: relative;
`