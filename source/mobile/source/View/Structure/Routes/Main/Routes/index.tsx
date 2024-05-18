import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

const Home = lazy(() => import("./Home"))

/**
 * Routes
 * 
 * @returns 
 */
export default function () {

    /**
     * Routes
     * 
     */
    return <Routes>
        <Route index element={<Home />} />
    </Routes>
}