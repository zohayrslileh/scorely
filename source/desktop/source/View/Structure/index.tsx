import { useEffect, useState } from "react"
import Welcome from "./Welcome"
import Routes from "./Routes"

/**
 * Structure
 * 
 * @returns 
 */
export default function () {

    /**
     * Is ready
     * 
     */
    const [isReady, setIsReady] = useState(true)

    /**
     * On load
     * 
     */
    useEffect(function () {

        // Timer
        const timer = setTimeout(() => setIsReady(true), 1000)

        /**
         * On end
         * 
         */
        return function () {

            clearTimeout(timer)
        }
    })

    return isReady ? <Routes /> : <Welcome />
}