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
     * Screenshot
     * 
     */
    const screenshot = stream.useState<unknown>("screenshot")

    console.log(screenshot)

    return <Container>
        TEST
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`