import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Card
 * 
 */
export default styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_DARK.hex};
    box-shadow: 0 0 20px ${() => Appearance.theme.schema.BACKGROUND_DARK.hex};
    border-radius: 10px;
    padding: 10px;
`