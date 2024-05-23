import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

const Record = lazy(() => import("./Record"))
const Create = lazy(() => import("./Create"))
const View = lazy(() => import("./View"))

/**
 * Session
 * 
 * @returns 
 */
export default function () {

    return <Routes>
        <Route index element={<Record />} />
        <Route path="create" element={<Create />} />
        <Route path=":id" element={<View />} />
    </Routes>
}