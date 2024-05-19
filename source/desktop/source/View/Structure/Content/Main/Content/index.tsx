import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import Card from "@/View/Components/Card"
import Exception from "@/View/Exception"
import { Suspense, lazy } from "react"
import styled from "@emotion/styled"

const Session = lazy(() => import("./Session"))

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
                    <Route path="session" element={<Session />} />
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