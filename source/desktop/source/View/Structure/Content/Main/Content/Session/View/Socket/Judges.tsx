import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Judges
 * 
 * @returns 
 */
export default function () {

    return <Container>
        Judges
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    border: 2px solid ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    border-radius: 7px;
    padding: 7px;
`