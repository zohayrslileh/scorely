import PendingException from "@/View/Exception/Exceptions/Pending"
import PromiseButton from "@/View/Components/PromiseButton"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Session from "@/Core/Session"

/**
 * Participants
 * 
 * @returns 
 */
export default function ({ session }: Props) {

    /**
     * Record promise
     * 
     */
    const record = usePromise(async () => await Participant.record({ name: "" }), [])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return <div>
        {record.solve.map(participant => (
            <p key={participant.id}>
                {participant.name}
                <PromiseButton onClick={async () => await session.addParticipant(participant)} pending="...">Add</PromiseButton>
                <PromiseButton onClick={async () => await session.removeParticipant(participant)} pending="...">Remove</PromiseButton>
            </p>
        ))}
    </div>
}

/**
 * Props
 * 
 */
interface Props {
    session: Session
}