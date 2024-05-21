import PendingException from "@/View/Exception/Exceptions/Pending"
import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Participant from "@/Core/Participant"
import Title from "@/View/Components/Title"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Row from "./Row"

/**
 * Record
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    /**
     * Record promise
     * 
     */
    const record = usePromise(async () => await Participant.record(), [])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return <Container>
        <Title><Lang>Participants</Lang></Title>
        <Button onClick={() => navigate("create")}>Create</Button>
        {record.solve.map(participant => <Row participant={participant} />)}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`