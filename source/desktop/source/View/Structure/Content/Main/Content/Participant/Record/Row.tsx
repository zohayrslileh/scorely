import PromiseButton from "@/View/Components/PromiseButton"
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
        <PromiseButton onClick={async () => await participant.delete()} pending="...">Delete</PromiseButton>
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