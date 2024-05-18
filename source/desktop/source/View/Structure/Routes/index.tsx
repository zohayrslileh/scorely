import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { lazy, useState } from "react"
import Server from "@/Models/Server"

const Connect = lazy(() => import("./Connect"))
const Auth = lazy(() => import("./Auth"))
const Main = lazy(() => import("./Main"))

/**
 * Routes
 * 
 * @returns 
 */
export default function () {

    /**
     * Server
     * 
     */
    const [server, setServer] = useState(() => Server.value)

    /**
     * Browser Router
     * 
     */
    return <BrowserRouter>

        <Routes>
            <Route index element={server ? <Main /> : <Navigate to="/connect" />} />
            <Route path="/auth" element={server ? <Auth /> : <Navigate to="/connect" />} />
            <Route path="/connect" element={<Connect value={server} onChange={setServer} />} />
        </Routes>

    </BrowserRouter>
}