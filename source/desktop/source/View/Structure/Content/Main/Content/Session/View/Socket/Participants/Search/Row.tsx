import LightButton from "@/View/Components/LightButton"
import { useCallback, useState } from "react"
import Participant from "@/Core/Participant"
import Appearance from "@/View/Appearance"
import Flex from "@/View/Components/Flex"
import { Lang } from "@/Tools/Language"
import { FiPlus } from "react-icons/fi"
import styled from "@emotion/styled"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ participant, onSelect }: Props) {
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

        await onSelect(participant)

        setIsAppend(true)

    }, [participant])

    return isAppend ? null : <Container>
        <p>{participant.name} {participant.club && <b>({participant.club})</b>}</p>
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
    participant: Participant
    onSelect: (participant: Participant) => Promise<void>
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