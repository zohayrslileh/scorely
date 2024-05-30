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
    const main = manager.useNamespace("/main")

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

    /**
     * Judges promise
     * 
     */
    const judges = usePromise(async () => await session.judges(), [])

    /**
     * Join promise
     * 
     */
    usePromise(async () => await main.ask("join", session.id), [])

    // Error status
    if (error) return <Throw exception={new ViewException(error)} />

    // Connecting status
    if (!connected) return <Throw exception={new PendingException("connecting")} />

    // Pending status
    if (participants.pending || judges.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (participants.exception) return <Throw exception={participants.exception.current} />

    // Exception status
    if (judges.exception) return <Throw exception={judges.exception.current} />

    return <Container>

        {/** Participants */}
        <Participants namespace={main} value={participants.solve} session={session} />

        {/** Judges */}
        <Judges namespace={main} value={judges.solve} session={session} />

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
    height: 100%;
    overflow: hidden;
    user-select: none;
`