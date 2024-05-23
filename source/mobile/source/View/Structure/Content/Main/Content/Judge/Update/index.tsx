import PendingException from "@/View/Exception/Exceptions/Pending"
import { useParams } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Judge from "@/Core/Judge"
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
     * Judge promise
     * 
     */
    const judge = usePromise(async () => await Judge.find(+id!), [])

    // Pending status
    if (judge.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (judge.exception) return <Throw exception={judge.exception.current} />

    return <Form judge={judge.solve} />
}