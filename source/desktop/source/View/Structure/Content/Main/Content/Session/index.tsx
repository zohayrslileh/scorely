import PendingException from "@/View/Exception/Exceptions/Pending"
import ErrorCard from "@/View/Components/ErrorCard"
import compiler from "@/View/Exception/compiler"
import Button from "@/View/Components/Button"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"

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
    const join = usePromise(async function () {

        await main.ask("judge-join")

    })

    // Error status
    if (error) return <Throw exception={new Error(error)} />

    // Conniting status
    if (!main.connected) return <Throw exception={new PendingException("connecting")} />

    return <div>
        <h1>Home</h1>
        <br />
        {join.exception && <ErrorCard message={compiler(join.exception.current).message} />}
        {!join.pending && <Button onClick={join.execute}>Join</Button>}
    </div>
}