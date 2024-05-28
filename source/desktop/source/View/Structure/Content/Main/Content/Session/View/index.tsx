import PendingException from "@/View/Exception/Exceptions/Pending"
import { useParams } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Session from "@/Core/Session"
import Socket from "./Socket"

/**
 * View
 * 
 * @returns 
 */
export default function () {

    /**
     * Params
     * 
     */
    const { id } = useParams()

    /**
     * Session promise
     * 
     */
    const session = usePromise(async () => await Session.find(+id!), [])

    // Pending status
    if (session.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (session.exception) return <Throw exception={session.exception.current} />

    return <Socket sessionId={session.solve.id} />
}