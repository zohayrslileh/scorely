import { Route, Routes } from "react-router-dom"
import styled from "@emotion/styled"
import { lazy } from "react"

const Record = lazy(() => import("./Record"))
const Create = lazy(() => import("./Create"))

/**
 * Participant
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Routes>
            <Route index element={<Record />} />
            <Route path="create" element={<Create />} />
        </Routes>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`