import { BrowserRouter, Route, Routes } from "react-router-dom"
import Server from "@/Models/Server"
import Connect from "./Connect"
import { lazy } from "react"

const Auth = lazy(() => import("./Auth"))
const Main = lazy(() => import("./Main"))

/**
 * Routes
 * 
 * @returns 
 */
export default function () {

    /**
     * Browser Router
     * 
     */
    return Server.value ? <BrowserRouter>

        <Routes>
            <Route index element={<Main />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>

    </BrowserRouter> : <Connect />
}