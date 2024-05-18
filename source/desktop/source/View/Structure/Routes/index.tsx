import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PendingException from "@/View/Exception/Exceptions/Pending"
import { lazy, useState, Suspense } from "react"
import { Throw } from "@/Tools/Exception"
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

        <Suspense fallback={<Throw exception={new PendingException} />}>

            <Routes>
                <Route index element={server ? <Main /> : <Navigate to="/connect" />} />
                <Route path="/auth" element={server ? <Auth /> : <Navigate to="/connect" />} />
                <Route path="/connect" element={<Connect value={server} onChange={setServer} />} />
            </Routes>

        </Suspense>

    </BrowserRouter>
}