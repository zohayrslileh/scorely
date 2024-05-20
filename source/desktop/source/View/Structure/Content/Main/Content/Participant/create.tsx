import PendingException from "@/View/Exception/Exceptions/Pending"
import Button from "@/View/Components/Button"
import Participant from "@/Core/Participant"
import Title from "@/View/Components/Title"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Read from "./read"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    /**
     * Create promise
     * 
     */
    const create = usePromise(async () => await Participant.create({ name: "Zohayr Zalmi" }))

    // Pending status
    if (create.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (create.exception) return <Throw exception={create.exception.current} />

    return create.solve ? <Read participant={create.solve.current} /> : <Container>
        <Title><Lang>Create new participant</Lang></Title>
        <Button onClick={create.execute}>Create</Button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`