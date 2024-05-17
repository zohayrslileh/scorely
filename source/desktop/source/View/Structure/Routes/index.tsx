import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from "react"

const Auth = lazy(() => import("./Auth"))
const Main = lazy(() => import("./Main"))

/**
 * Routes
 * 
 * @returns 
 */
export default function () {

    return <BrowserRouter>

        <Routes>
            <Route index element={<Main />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>

    </BrowserRouter>
}