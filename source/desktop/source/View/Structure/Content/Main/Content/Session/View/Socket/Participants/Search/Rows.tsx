import PendingException from "@/View/Exception/Exceptions/Pending"
import Participant from "@/Core/Participant"
import Empty from "@/View/Components/Empty"
import Grid from "@/View/Components/Grid"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Row from "./Row"

/**
 * Record
 * 
 * @returns 
 */
export default function ({ filter, onAddParticipant, participants }: Props) {

    /**
     * Record promise
     * 
     */
    const record = usePromise(async () => await Participant.record(filter), [filter])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    /**
     * Unused participants
     * 
     */
    const unusedParticipants = record.solve.filter(participant => !participants.find(item => item.id === participant.id))

    return unusedParticipants.length ? <Grid columns="repeat(auto-fit, minmax(450px, auto))" gap="10px" style={{ overflow: "hidden" }}>
        {unusedParticipants.map(participant => <Row key={participant.id} participant={participant} onSelect={onAddParticipant} />)}
    </Grid> : <Empty />
}

/**
 * Props
 * 
 */
interface Props {
    filter: unknown
    onAddParticipant: (participant: Participant) => void
    participants: Participant[]
}