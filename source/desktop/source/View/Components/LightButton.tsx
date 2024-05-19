import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Light button component
 * 
 */
const LightButton = styled.button`
    color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba(0.8)};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    border-radius: 7px;
    padding: 9px 15px;
    border: none;
    outline: none;
    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;

    &:active {
        background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    }
`

export default LightButton