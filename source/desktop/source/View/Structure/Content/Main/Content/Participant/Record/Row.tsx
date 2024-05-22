import PromiseButton from "@/View/Components/PromiseButton"
import { useCallback, useState } from "react"
import Participant from "@/Core/Participant"
import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"
import Appearance from "@/View/Appearance"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ participant }: Props) {

    const navigate = useNavigate()

    const [isDelete, setIsDelete] = useState(false)

    const destroy = useCallback(async function () {

        await participant.delete()

        setIsDelete(true)

    }, [participant])

    return isDelete ? null : <Container>
        {participant.name}
        <PromiseButton onClick={destroy} pending="...">Delete</PromiseButton>
        <PromiseButton onClick={() => navigate(`${participant.id}/edit`)}>Edit</PromiseButton>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    border-radius: 7px;
    padding: 10px;
`

/**
 * Props
 * 
 */
interface Props {
    participant: Participant
}