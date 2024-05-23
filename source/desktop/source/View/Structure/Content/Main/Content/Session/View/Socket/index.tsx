import PendingException from "@/View/Exception/Exceptions/Pending"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"
import { useEffect } from "react"

/**
 * Socket
 * 
 * @returns 
 */
export default function () {

    /**
     * Main
     * 
     */
    const main = manager.useNamespace("/main")

    /**
     * Before Effect
     * 
     */
    useEffect(function () {

        // Connect
        main.socket.connect()

        /**
         * After Effect
         * 
         */
        return function () {

            // Disconnect
            main.socket.disconnect()
        }

    }, [])

    // Pending status
    if (!main.connected) return <Throw exception={new PendingException("connecting")} />

    return <p>Done</p>
}