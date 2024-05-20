import PendingException from "@/View/Exception/Exceptions/Pending"
import JsonView from "@/View/Components/JsonView"
import Button from "@/View/Components/Button"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"

/**
 * Read
 * 
 * @returns 
 */
export default function ({ participant, reset }: Props) {

    /**
     * Read promise
     * 
     */
    const read = usePromise(async () => await participant.read(), [participant])

    // Pending status
    if (read.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (read.exception) return <Throw exception={read.exception.current} />

    return <Container>
        <JsonView json={read.solve} />
        <Button onClick={reset}>New</Button>
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
    reset: () => void
}