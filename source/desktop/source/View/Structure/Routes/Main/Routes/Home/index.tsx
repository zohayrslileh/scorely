import PendingException from "@/View/Exception/Exceptions/Pending"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"

/**
 * Home
 * 
 * @returns 
 */
export default function () {

    /**
     * Session
     * 
     */
    const session = manager.useNamespace("/session")

    /**
     * Connected
     * 
     */
    const connected = session.useConnected()

    /**
     * Error
     * 
     */
    const error = session.useState<string>("error")

    // Error status
    if (error) return <Throw exception={new Error(error)} />

    // Conniting status
    if (!connected) return <Throw exception={new PendingException("connecting")} />

    return <h1>Home</h1>
}