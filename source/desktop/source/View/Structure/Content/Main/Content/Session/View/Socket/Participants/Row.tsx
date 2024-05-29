import Participant from "@/Core/Participant"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ participant }: Props) {

    return <Container>
        <p>{participant.name} {participant.club && <b>({participant.club})</b>}</p>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    participant: Participant
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    border: 1px solid ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.1)};
    display: grid;
    justify-items: center;
    align-items: center;
    border-radius: 7px;
    height: 150px;
    margin: auto;
    width: -webkit-fill-available;
    min-height: 150px;
    height: 100%;

    > p {
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
    }
`