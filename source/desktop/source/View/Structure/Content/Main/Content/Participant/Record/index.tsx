import PendingException from "@/View/Exception/Exceptions/Pending"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
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
    const record = usePromise(async () => await Participant.record(), [])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return <Container>
        {record.solve.map(participant => <Row participant={participant} />)}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`