import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Select component
 * 
 */
export default styled.select`
    color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    border-radius: 7px;
    padding: 10px 10px;
    border: none;
    outline: none;
    border-inline-end: 10px solid transparent
`