import PendingException from "@/View/Exception/Exceptions/Pending"
import ViewException from "@/View/Exception/Exceptions"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"
import Participants from "./Participants"
import styled from "@emotion/styled"
import Judges from "./Judges"

/**
 * Socket
 * 
 * @returns 
 */
export default function ({ sessionId }: Props) {

    /**
     * Main
     * 
     */
    const main = manager.useNamespace("/main", { auth: { sessionId } })

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

    // Error status
    if (error) return <Throw exception={new ViewException(error)} />

    // Connecting status
    if (!connected) return <Throw exception={new PendingException("connecting")} />

    return <Container>

        {/** Participants */}
        <Participants namespace={main} />

        {/** Judges */}
        <Judges />

    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    sessionId: number
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