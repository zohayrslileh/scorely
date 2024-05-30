import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Header
 * 
 * @returns 
 */
export default function ({ sessionId, participantName }: Props) {

    return <Container>
        <p><Lang>Session</Lang>: {sessionId}</p>
        <p><Lang>Participant</Lang>: {participantName}</p>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    sessionId: number
    participantName: string
}

/**
 * Container
 * 
 */
const Container = styled.div`
`