import PendingException from "@/View/Exception/Exceptions/Pending"
import ViewException from "@/View/Exception/Exceptions"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"
import Participants from "./Participants"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import Session from "@/Core/Session"
import Judges from "./Judges"

/**
 * Socket
 * 
 * @returns 
 */
export default function ({ session }: Props) {

    /**
     * Main
     * 
     */
    const main = manager.useNamespace("/main", { auth: { sessionId: session.id } })

    /**
     * Connected
     * 
     */
    const connected = main.useConnected()

    /**
     * Error
     * 
     */
    const error = main.useError()

    /**
     * Participants promise
     * 
     */
    const participants = usePromise(async () => await session.participants(), [])

    // Error status
    if (error) return <Throw exception={new ViewException(error)} />

    // Connecting status
    if (!connected) return <Throw exception={new PendingException("connecting")} />

    // Pending status
    if (participants.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (participants.exception) return <Throw exception={participants.exception.current} />

    return <Container>

        {/** Participants */}
        <Participants namespace={main} value={participants.solve} />

        {/** Judges */}
        <Judges />

    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    session: Session
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`