import LightButton from "@/View/Components/LightButton"
import { useCallback, useState } from "react"
import Judge from "@/Core/Judge"
import Appearance from "@/View/Appearance"
import { FiTrash2 } from "react-icons/fi"
import Flex from "@/View/Components/Flex"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ judge, onSelect }: Props) {
    /**
     * Is append
     * 
     */
    const [isAppend, setIsAppend] = useState(false)

    /**
     * Append method
     * 
     * @returns
     */
    const append = useCallback(async function () {

        await onSelect(judge)

        setIsAppend(true)

    }, [judge])

    return isAppend ? null : <Container>
        <p>{judge.name}</p>
        <Flex id="control">
            <LightButton onClick={append}><FiTrash2 /><Lang>Add</Lang></LightButton>
        </Flex>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    judge: Judge
    onSelect: (judge: Judge) => Promise<void>
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