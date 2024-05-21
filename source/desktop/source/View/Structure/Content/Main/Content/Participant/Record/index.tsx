import PendingException from "@/View/Exception/Exceptions/Pending"
import LightButton from "@/View/Components/LightButton"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
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
    const record = usePromise(async () => await Participant.record(), [])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return <Container>
        {record.solve.map(participant => <div key={participant.id}>
            <b>{participant.name}</b> <LightButton onClick={async () => await participant.delete()}>Delete</LightButton>
        </div>)}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`