import AppearanceState, { initialAppearance } from "./context"
import Language from "@/View/Language"
import styled from "@emotion/styled"
import schema from "./schema"
import fonts from "./Fonts"

/*
|-----------------------------
|  Appearance
|-----------------------------
|
|
*/
const Appearance = new AppearanceState(initialAppearance)

/*
|-----------------------------
|  Container
|-----------------------------
|
|
*/
const Container = styled.div`

    // Load fonts
    ${fonts}

    // Style sheet
    background-color: ${() => Appearance.theme.schema.BACKGROUND.rgba()};
    color: ${() => Appearance.theme.schema.COLOR.rgba()};
    direction: ${() => Language.value.direction};
    font-family: ${() => schema.FONT_REGULAR};
    zoom: ${() => Appearance.zoom}%;
    position: absolute;
    overflow: auto;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
`

export default Object.assign(Appearance, { Container, schema })