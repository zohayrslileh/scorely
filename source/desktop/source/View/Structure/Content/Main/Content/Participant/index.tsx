import { Route, Routes } from "react-router-dom"
import styled from "@emotion/styled"
import { lazy } from "react"

const Record = lazy(() => import("./Record"))

/**
 * Participant
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Routes>
            <Route index element={<Record />} />
        </Routes>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`