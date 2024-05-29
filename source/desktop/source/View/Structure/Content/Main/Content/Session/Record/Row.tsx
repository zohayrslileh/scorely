import LightButton from "@/View/Components/LightButton"
import { FiEye, FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import Appearance from "@/View/Appearance"
import Flex from "@/View/Components/Flex"
import { Update } from "@/Tools/Updater"
import { Lang } from "@/Tools/Language"
import Session from "@/Core/Session"
import styled from "@emotion/styled"
import { useCallback } from "react"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ session, dispatch }: Props) {

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

        await session.delete()

        dispatch(sessions => sessions.filter(item => item !== session))

    }, [session, dispatch])

    return <Container className="animation">
        <p>{session.id}</p>
        <Flex id="control">
            <LightButton onClick={() => navigate(`${session.id}`)}><FiEye /><Lang>View</Lang></LightButton>
            <LightButton onClick={destroy} id="delete"><FiTrash2 /><Lang>Delete</Lang></LightButton>
        </Flex>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Flex)`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    border: 1px solid ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.1)};
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
    session: Session
    dispatch: Update<Session[]>
}