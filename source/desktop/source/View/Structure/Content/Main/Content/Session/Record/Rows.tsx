import PendingException from "@/View/Exception/Exceptions/Pending"
import Empty from "@/View/Components/Empty"
import Grid from "@/View/Components/Grid"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Session from "@/Core/Session"
import Row from "./Row"

/**
 * Record
 * 
 * @returns 
 */
export default function () {

    /**
     * Record promise
     * 
     */
    const record = usePromise(async () => await Session.record(), [])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return record.solve.length ? <Grid columns="repeat(auto-fit, minmax(450px, auto))" gap="10px" style={{ overflow: "hidden" }}>
        {record.solve.map(session => <Row key={session.id} session={session} dispatch={record.dispatch} />)}
    </Grid> : <Empty />
}