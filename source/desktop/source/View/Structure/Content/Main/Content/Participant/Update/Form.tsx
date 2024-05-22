import PendingException from "@/View/Exception/Exceptions/Pending"
import TextInput from "@/View/Components/TextInput"
import Button from "@/View/Components/Button"
import Participant from "@/Core/Participant"
import { Navigate } from "react-router-dom"
import Title from "@/View/Components/Title"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import useForm from "@/Tools/Form"

/**
 * Form
 * 
 * @returns 
 */
export default function ({ participant }: Props) {

    /**
     * Form
     * 
     */
    const { value, update } = useForm(() => participant)

    /**
     * Create promise
     * 
     */
    const create = usePromise(async () => participant.update(value))

    // Pending status
    if (create.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (create.exception) return <Throw exception={create.exception.current} />

    // Solve status
    if (create.solve) return <Navigate to=".." />

    return <Container>
        <Title><Lang>Edit new participant</Lang></Title>
        <TextInput placeholder="Name" type="text" value={value.name} onChange={value => update.name(value)} />
        <Button onClick={create.execute}><Lang>Create</Lang></Button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`

/**
 * Props
 * 
 */
interface Props {
    participant: Participant
}