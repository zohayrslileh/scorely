import LightButton from "@/View/Components/LightButton"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import compiler from "@/View/Exception/compiler"
import { useNavigate } from "react-router-dom"
import Appearance from "@/View/Appearance"
import Flex from "@/View/Components/Flex"
import { Update } from "@/Tools/Updater"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { useCallback } from "react"
import Judge from "@/Core/Judge"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ judge, dispatch }: Props) {

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

            await judge.delete()

            dispatch(judges => judges.filter(item => item !== judge))

        } catch (exception) {

            alert(compiler(exception))
        }

    }, [judge, dispatch])

    return <Container className="animation">
        <p>{judge.name}</p>
        <Flex id="control">
            <LightButton onClick={() => navigate(`${judge.id}/edit`)}><FiEdit2 /><Lang>Edit</Lang></LightButton>
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
    judge: Judge
    dispatch: Update<Judge[]>
}