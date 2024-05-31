import { LuStar, LuUser2 } from "react-icons/lu"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Header
 * 
 * @returns 
 */
export default function ({ sessionId, participantName }: Props) {

    return <Container>
        <div id="session" className="flex-card">
            <LuStar />
            {sessionId}
        </div>
        <div id="participant" className="flex-card">
            <LuUser2 />
            {participantName}
        </div>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    sessionId: number
    participantName: string
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;

    > .flex-card {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 15px;
        font-family: ${() => Appearance.schema.FONT_BOLD};
        border-radius: 7px;
        font-size: 22px;

        &#session {
            background-color: ${() => Appearance.theme.schema.BACKGROUND_SECONDARY.rgba()};
        }

        &#participant {
            border: 2px solid ${() => Appearance.theme.schema.BACKGROUND_SECONDARY.rgba()};
        }
    }
`