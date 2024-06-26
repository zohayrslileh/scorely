import LightButton from "@/View/Components/LightButton"
import { useCallback, useState } from "react"
import Appearance from "@/View/Appearance"
import Flex from "@/View/Components/Flex"
import { Lang } from "@/Tools/Language"
import { FiPlus } from "react-icons/fi"
import styled from "@emotion/styled"
import Judge from "@/Core/Judge"

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

    return isAppend ? null : <Container className={`${judge.primary ? "primary" : ""}`}>
        <p>{judge.name}</p>
        <Flex id="control">
            <LightButton onClick={append}><FiPlus /><Lang>Add</Lang></LightButton>
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
    background: ${() => Appearance.theme.schema.BACKGROUND_GRADIENT};
    border-radius: 7px;
    padding: 15px;

    &.primary {
        border: 2px solid ${() => Appearance.theme.schema.FORCE_COLOR.rgba()};
    }

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