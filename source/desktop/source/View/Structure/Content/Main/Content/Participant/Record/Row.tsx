import LightButton from "@/View/Components/LightButton"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { useCallback, useState } from "react"
import Participant from "@/Core/Participant"
import Appearance from "@/View/Appearance"
import Flex from "@/View/Components/Flex"
import styled from "@emotion/styled"

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

    return isDelete ? null : <Container className="animation">
        <p>{participant.name}</p>
        <Flex id="control">
            <LightButton onClick={() => navigate(`${participant.id}/edit`)}><FiEdit2 />Edit</LightButton>
            <LightButton onClick={destroy} pending="..." id="delete"><FiTrash2 />Delete</LightButton>
        </Flex>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Flex)`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    border-radius: 7px;
    padding: 15px;

    > p {
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
    }

    > #control > button {
        border: 1px solid ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.1)};

        &#delete {
            background-color: #e14343;
            color: ${() => Appearance.schema.COLOR_LIGHT.rgba()};
        }
    }
`

/**
 * Props
 * 
 */
interface Props {
    participant: Participant
}