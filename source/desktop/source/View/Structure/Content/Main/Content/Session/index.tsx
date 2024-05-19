import PendingException from "@/View/Exception/Exceptions/Pending"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"

/**
 * Session
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
     * Error
     * 
     */
    const error = main.useState<string>("error")

    // Error status
    if (error) return <Throw exception={new Error(error)} />

    // Conniting status
    if (!main.connected) return <Throw exception={new PendingException("connecting")} />

    return <h1>Home</h1>
}