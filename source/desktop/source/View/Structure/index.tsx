import { useEffect, useState } from "react"
import Welcome from "./Welcome"
import Body from "./Body"

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
    const [isReady, setIsReady] = useState(false)

    /**
     * After Effect
     * 
     */
    useEffect(function () {

        // Timer
        const timer = setTimeout(() => setIsReady(true), 1000)

        /**
         * Before Effect
         * 
         */
        return function () {

            clearTimeout(timer)
        }
    })

    return isReady ? <Body /> : <Welcome />
}