import PendingException from "@/View/Exception/Exceptions/Pending"
import JsonView from "@/View/Components/JsonView"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import styled from "@emotion/styled"

/**
 * Record
 * 
 * @returns 
 */
export default function () {

    /**
     * Record
     * 
     */
    const record = Participant.useRecord()

    // Pending status
    if (record.loading) return <Throw exception={new PendingException} />

    // Exception status
    if (record.error) return <Throw exception={record.error} />

    return <Container>
        <JsonView json={record} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`