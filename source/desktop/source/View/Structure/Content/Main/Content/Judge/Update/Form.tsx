import PendingException from "@/View/Exception/Exceptions/Pending"
import TextInput from "@/View/Components/TextInput"
import { Lang, useLang } from "@/Tools/Language"
import Button from "@/View/Components/Button"
import { Navigate } from "react-router-dom"
import Title from "@/View/Components/Title"
import { Throw } from "@/Tools/Exception"
import Grid from "@/View/Components/Grid"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import useForm from "@/Tools/Form"
import Judge from "@/Core/Judge"

/**
 * Form
 * 
 * @returns 
 */
export default function ({ judge }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    /**
     * Form
     * 
     */
    const { value, update } = useForm(() => judge)

    /**
     * Create promise
     * 
     */
    const create = usePromise(async () => judge.update(value))

    // Pending status
    if (create.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (create.exception) return <Throw exception={create.exception.current} />

    // Solve status
    if (create.solve) return <Navigate to=".." />

    return <Container gap="20px">
        <Title><Lang>Edit judge</Lang> "{judge.name}"</Title>
        <Grid gap="10px">
            <TextInput placeholder={lang("Name")} type="text" value={value.name} onChange={value => update.name(value)} />
            <TextInput placeholder={lang("Username")} type="text" value={value.username} onChange={value => update.username(value)} />
            <TextInput placeholder={lang("Password")} type="password" value={value.password || ""} onChange={value => update.password(value || undefined)} />
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
    judge: Judge
}