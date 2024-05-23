import PromiseButton from "./PromiseButton"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Light button component
 * 
 */
export default styled(PromiseButton)`
    color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba(0.8)};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    border-radius: 7px;
    padding: 9px 15px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 10px;

    &:active {
        background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    }
`