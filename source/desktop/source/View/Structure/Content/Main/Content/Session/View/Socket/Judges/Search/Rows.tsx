import PendingException from "@/View/Exception/Exceptions/Pending"
import Judge from "@/Core/Judge"
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
export default function ({ filter, onAddJudge, judges }: Props) {

    /**
     * Record promise
     * 
     */
    const record = usePromise(async () => await Judge.record(filter), [filter])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    /**
     * Unused judges
     * 
     */
    const unusedJudges = record.solve.filter(judge => !judges.find(item => item.id === judge.id))

    return unusedJudges.length ? <Grid columns="repeat(auto-fit, minmax(450px, auto))" gap="10px" style={{ overflow: "hidden" }}>
        {unusedJudges.map(judge => <Row key={judge.id} judge={judge} onSelect={onAddJudge} />)}
    </Grid> : <Empty />
}

/**
 * Props
 * 
 */
interface Props {
    filter: unknown
    onAddJudge: (judge: Judge) => void
    judges: Judge[]
}