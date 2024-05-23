import PendingException from "@/View/Exception/Exceptions/Pending"
import TextInput from "@/View/Components/TextInput"
import { Lang, useLang } from "@/Tools/Language"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import Grid from "@/View/Components/Grid"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import useForm from "@/Tools/Form"
import Judge from "@/Core/Judge"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    /**
     * Form
     * 
     */
    const { value, update } = useForm(() => new JudgeForm)

    /**
     * Create promise
     * 
     */
    const create = usePromise(async () => await Judge.create(value))

    // Pending status
    if (create.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (create.exception) return <Throw exception={create.exception.current} />

    // Solve status
    if (create.solve) return <Navigate to=".." />

    return <Container gap="20px">
        <Title><Lang>Add new judge</Lang></Title>
        <Grid gap="10px">
            <TextInput placeholder={lang("Name")} type="text" value={value.name || ""} onChange={value => update.name(value || undefined)} />
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
 * Judge Form
 * 
 */
class JudgeForm {

    /**
     * Name
     * 
     */
    public name: string | undefined
}