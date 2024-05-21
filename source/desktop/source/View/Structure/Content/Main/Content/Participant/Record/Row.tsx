import Participant from "@/Core/Participant"
import styled from "@emotion/styled"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ participant }: Props) {

    return <Container>
        {participant.name}
        <button onClick={async () => await participant.delete()}>Delete</button>
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