import PendingException from "@/View/Exception/Exceptions/Pending"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"
import Logo from "@/View/Components/Logo"
import styled from "@emotion/styled"

/**
 * Body
 * 
 * @returns 
 */
export default function () {

    /**
     * Main
     * 
     */
    const main = manager.useNamespace("/main")

    // Pending status
    if (!main.connected) return <Throw exception={new PendingException("connecting")} />

    return <Container>

        <Logo width={200} id="logo" />

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`

    > #logo {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        opacity: 0.1;
    }
`