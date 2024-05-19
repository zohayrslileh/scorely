import AppearanceState, { initialAppearance } from "./context"
import { keyframes } from "@emotion/react"
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

    .animation {
        
        animation: ${keyframes`

            0% {
                transform: translateY(10px);
                opacity: 0;
            }

            100% {
                transform: none;
                opacity: 1;
            }

        `} ease 300ms;

        &:nth-child(even) {

            animation: ${keyframes`

                0% {
                    transform: translateY(-10px);
                    opacity: 0;
                }

                100% {
                    transform: none;
                    opacity: 1;
                }

            `} ease 300ms;
        }
    }
`

export default Object.assign(Appearance, { Container, schema })