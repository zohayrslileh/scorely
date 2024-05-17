import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from "react"

const Auth = lazy(() => import("./Auth"))

/**
 * Routes
 * 
 * @returns 
 */
export default function () {

    return <BrowserRouter>

        <Routes>
            <Route path="/auth" element={<Auth />} />
        </Routes>

    </BrowserRouter>
}