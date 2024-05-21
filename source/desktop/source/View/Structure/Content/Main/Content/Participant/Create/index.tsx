import PendingException from "@/View/Exception/Exceptions/Pending"
import TextInput from "@/View/Components/TextInput"
import Button from "@/View/Components/Button"
import Participant from "@/Core/Participant"
import Title from "@/View/Components/Title"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import useForm from "@/Tools/Form"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    /**
     * Form
     * 
     */
    const { value, update } = useForm(() => new ParticipantForm)

    /**
     * Create promise
     * 
     */
    const create = usePromise(async () => await Participant.create(value))

    // Pending status
    if (create.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (create.exception) return <Throw exception={create.exception.current} />

    // Solve status
    if (create.solve) return <Navigate to=".." />

    return <Container>
        <Title><Lang>Create new participant</Lang></Title>
        <TextInput placeholder="Name" type="text" value={value.name || ""} onChange={value => update.name(value || undefined)} />
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
 * Participant Form
 * 
 */
class ParticipantForm {

    /**
     * Name
     * 
     */
    public name: string | undefined
}