import PendingException from "@/View/Exception/Exceptions/Pending"
import Empty from "@/View/Components/Empty"
import Grid from "@/View/Components/Grid"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Judge from "@/Core/Judge"
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
    const record = usePromise(async () => await Judge.record(filter), [filter])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return record.solve.length ? <Grid columns="repeat(auto-fit, minmax(450px, auto))" gap="10px" style={{ overflow: "hidden" }}>
        {record.solve.map(judge => <Row key={judge.id} judge={judge} dispatch={record.dispatch} />)}
    </Grid> : <Empty />
}

/**
 * Props
 * 
 */
interface Props {
    filter: unknown
}