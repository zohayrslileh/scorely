import PendingException from "@/View/Exception/Exceptions/Pending"
import { useParams } from "react-router-dom"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Form from "./Form"

/**
 * Update
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
     * Participant promise
     * 
     */
    const participant = usePromise(async () => await Participant.find(+id!), [])

    // Pending status
    if (participant.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (participant.exception) return <Throw exception={participant.exception.current} />

    return <Form participant={participant.solve} />
}