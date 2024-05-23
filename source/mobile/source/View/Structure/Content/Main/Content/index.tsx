import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import Card from "@/View/Components/Card"
import Exception from "@/View/Exception"
import { Suspense, lazy } from "react"
import styled from "@emotion/styled"

const Participant = lazy(() => import("./Participant"))
const Session = lazy(() => import("./Session"))
const Judge = lazy(() => import("./Judge"))

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
                    <Route index element={<Navigate to="session" />} />
                    <Route path="participant/*" element={<Participant />} />
                    <Route path="session/*" element={<Session />} />
                    <Route path="judge/*" element={<Judge />} />
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
    padding: 20px;
    overflow: auto;
    display: grid;
`