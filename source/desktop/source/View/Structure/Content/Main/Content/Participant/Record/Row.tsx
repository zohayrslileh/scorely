import PromiseButton from "@/View/Components/PromiseButton"
import { useCallback, useState } from "react"
import Participant from "@/Core/Participant"
import styled from "@emotion/styled"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ participant }: Props) {

    const [isDelete, setIsDelete] = useState(false)

    const destroy = useCallback(async function () {

        await participant.delete()

        setIsDelete(true)

    }, [participant])

    return isDelete ? null : <Container>
        {participant.name}
        <PromiseButton onClick={destroy} pending="...">Delete</PromiseButton>
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