import PromiseButton from "./PromiseButton"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Button component
 * 
 */
export default styled(PromiseButton)`
    background-color: ${() => Appearance.schema.COLOR_BLUE.rgba(0.8)};
    color: ${() => Appearance.schema.COLOR_LIGHT.rgba()};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    border-radius: 7px;
    padding: 15px 15px;
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