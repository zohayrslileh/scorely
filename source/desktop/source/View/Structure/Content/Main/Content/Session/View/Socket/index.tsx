import PendingException from "@/View/Exception/Exceptions/Pending"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"

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
     * Connected
     * 
     */
    const connected = main.useConnected()

    // Pending status
    if (!connected) return <Throw exception={new PendingException("connecting")} />

    return <p>Done</p>
}