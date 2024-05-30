import PendingException from "@/View/Exception/Exceptions/Pending"
import ViewException from "@/View/Exception/Exceptions"
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

    /**
     * Error
     * 
     */
    const error = main.useError()

    // Error status
    if (error) return <Throw exception={new ViewException(error)} />

    // Pending status
    if (!connected) return <Throw exception={new PendingException("connecting")} />

    return <p>Done</p>
}