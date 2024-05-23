import PendingException from "@/View/Exception/Exceptions/Pending"
import TextInput from "@/View/Components/TextInput"
import { Lang, useLang } from "@/Tools/Language"
import Button from "@/View/Components/Button"
import Participant from "@/Core/Participant"
import { Navigate } from "react-router-dom"
import Title from "@/View/Components/Title"
import { Throw } from "@/Tools/Exception"
import Grid from "@/View/Components/Grid"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import useForm from "@/Tools/Form"

/**
 * Form
 * 
 * @returns 
 */
export default function ({ participant }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

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

    return <Container gap="20px">
        <Title><Lang>Edit participant</Lang> "{participant.name}"</Title>
        <Grid gap="10px">
            <TextInput placeholder={lang("Name")} type="text" value={value.name} onChange={value => update.name(value)} />
            <TextInput placeholder={lang("Club")} type="text" value={value.club || ""} onChange={value => update.club(value || null)} />
            <Button onClick={create.execute}><Lang>Save</Lang></Button>
        </Grid>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Grid)`
    height: fit-content;
`

/**
 * Props
 * 
 */
interface Props {
    participant: Participant
}