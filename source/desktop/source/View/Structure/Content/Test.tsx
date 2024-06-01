import manager from "@/Models/Server/Socket"
import styled from "@emotion/styled"

/**
 * Test
 * 
 * @returns 
 */
export default function () {

    /**
     * Stream
     * 
     */
    const stream = manager.useNamespace("/stream")

    /**
     * Connected
     * 
     */
    stream.useConnected()

    /**
     * Screenshot
     * 
     */
    const screenshot = stream.useState<string>("screenshot")

    /**
     * Source
     * 
     */
    const source = screenshot ? `data:image/png;base64,${screenshot}` : undefined

    return <Container>
        {source ? <img src={source} alt="" /> : <p>Waiting...</p>}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`