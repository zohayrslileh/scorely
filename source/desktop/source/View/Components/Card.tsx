import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Card
 * 
 */
export default styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_SECONDARY.hex};
    border-radius: 10px;
    padding: 10px;
`