import PendingException from "@/View/Exception/Exceptions/Pending"
import Participant from "@/Core/Participant"
import Grid from "@/View/Components/Grid"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Row from "./Row"

/**
 * Record
 * 
 * @returns 
 */
export default function ({ filter }: Props) {

    /**
     * Record promise
     * 
     */
    const record = usePromise(async () => await Participant.record(filter), [filter])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return record.solve.length ? <Grid columns="1fr 1fr" gap="10px" style={{ overflow: "hidden" }}>
        {record.solve.map(participant => <Row key={participant.id} participant={participant} />)}
    </Grid> : <b>Not found !!</b>
}

/**
 * Props
 * 
 */
interface Props {
    filter: unknown
}