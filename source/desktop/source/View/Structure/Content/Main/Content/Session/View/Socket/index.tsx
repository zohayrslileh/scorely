import PendingException from "@/View/Exception/Exceptions/Pending"
import Button from "@/View/Components/Button"
import manager from "@/Models/Server/Socket"
import Participants from "./Participants"
import { Throw } from "@/Tools/Exception"
import styled from "@emotion/styled"
import Judges from "./Judges"

/**
 * Socket
 * 
 * @returns 
 */
export default function () {

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

    // Pending status
    if (!connected) return <Throw exception={new PendingException("connecting")} />

    return <Container>

        <Button onClick={async () => await main.ask("admin-join")}>Admin Join</Button>

        {/** Participants */}
        <Participants />

        {/** Judges */}
        <Judges />

    </Container>
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