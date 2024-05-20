import PendingException from "@/View/Exception/Exceptions/Pending"
import JsonView from "@/View/Components/JsonView"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"

/**
 * Read
 * 
 * @returns 
 */
export default function ({ participant }: Props) {

    /**
     * Read promise
     * 
     */
    const read = usePromise(participant.read, [participant])

    // Pending status
    if (read.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (read.exception) return <Throw exception={read.exception.current} />

    return <Container>
        <JsonView json={read.solve} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`

/**
 * Props
 * 
 */
interface Props {
    participant: Participant
}