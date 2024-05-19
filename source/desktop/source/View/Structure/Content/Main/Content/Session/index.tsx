import PendingException from "@/View/Exception/Exceptions/Pending"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"
import { useCallback } from "react"
import EventError from "@/Tools/Socket/EventError"
import Button from "@/View/Components/Button"

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

    /**
     * Join
     * 
     */
    const join = useCallback(async function () {

        try {

            await main.ask("judge-join")

        } catch (error) {

            if (error instanceof EventError) alert(error.message)

        }

    }, [])

    // Error status
    if (error) return <Throw exception={new Error(error)} />

    // Conniting status
    if (!main.connected) return <Throw exception={new PendingException("connecting")} />

    return <div>
        <h1>Home</h1>
        <br />
        <Button onClick={join}>Join</Button>
    </div>
}