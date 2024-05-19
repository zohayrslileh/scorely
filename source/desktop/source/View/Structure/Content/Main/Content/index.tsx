import PendingException from "@/View/Exception/Exceptions/Pending"
import { Route, Routes } from "react-router-dom"
import Card from "@/View/Components/Card"
import { Throw } from "@/Tools/Exception"
import Exception from "@/View/Exception"
import { Suspense, lazy } from "react"
import styled from "@emotion/styled"

const Home = lazy(() => import("./Home"))

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <Container className="animation">

        <Exception>

            <Suspense fallback={<Throw exception={new PendingException} />}>

                <Routes>
                    <Route index element={<Home />} />
                </Routes>

            </Suspense>

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