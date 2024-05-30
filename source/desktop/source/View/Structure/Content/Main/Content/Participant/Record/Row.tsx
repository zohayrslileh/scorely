import LightButton from "@/View/Components/LightButton"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import compiler from "@/View/Exception/compiler"
import { useNavigate } from "react-router-dom"
import Participant from "@/Core/Participant"
import Appearance from "@/View/Appearance"
import Flex from "@/View/Components/Flex"
import { Update } from "@/Tools/Updater"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { useCallback } from "react"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ participant, dispatch }: Props) {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    /**
     * Destroy method
     * 
     * @returns
     */
    const destroy = useCallback(async function () {

        try {

            await participant.delete()

            dispatch(participants => participants.filter(item => item !== participant))

        } catch (exception) {

            alert(compiler(exception))
        }

    }, [participant, dispatch])

    return <Container className="animation">
        <p>{participant.name} {participant.club && <b>({participant.club})</b>}</p>
        <Flex id="control">
            <LightButton onClick={() => navigate(`${participant.id}/edit`)}><FiEdit2 /><Lang>Edit</Lang></LightButton>
            <LightButton onClick={destroy} id="delete"><FiTrash2 /><Lang>Delete</Lang></LightButton>
        </Flex>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Flex)`
    background: ${() => Appearance.theme.schema.BACKGROUND_GRADIENT};
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
    dispatch: Update<Participant[]>
}