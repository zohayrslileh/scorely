import TextInput from "@/Tools/MaterialUI/TextInput"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Text input component
 * 
 */
export default styled(TextInput)`
    color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    border-radius: 7px;
    padding: 16px 10px;
    font-size: 1em;
    border: none;
    outline: none;

    &::placeholder {
        opacity: 0.5;
    }
`