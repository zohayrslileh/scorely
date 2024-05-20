import Title from "@/View/Components/Title"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Button from "@/View/Components/Button"
import usePromise from "@/Tools/Promise"
import request from "@/Models/Server/Request"
import JsonView from "@/View/Components/JsonView"
import ErrorCard from "@/View/Components/ErrorCard"
import compiler from "@/View/Exception/compiler"

/**
 * Participant
 * 
 * @returns 
 */
export default function () {

    const create = usePromise(async function () {

        return await request<object>({ method: "POST", url: "/participant" })
    })

    return <Container>
        <Title><Lang>Participants</Lang></Title>
        {create.exception && <ErrorCard message={compiler(create.exception.current).message} />}
        {create.solve && <JsonView json={create.solve.current} />}
        <Button onClick={create.execute}>Create</Button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`