import PendingException from "@/View/Exception/Exceptions/Pending"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import Grid from "@/View/Components/Grid"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import Session from "@/Core/Session"
import styled from "@emotion/styled"

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
    const create = usePromise(async () => await Session.create())

    // Pending status
    if (create.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (create.exception) return <Throw exception={create.exception.current} />

    // Solve status
    if (create.solve) return <Navigate to=".." />

    return <Container gap="20px">
        <Title><Lang>Add new session</Lang></Title>
        <Grid gap="10px">
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