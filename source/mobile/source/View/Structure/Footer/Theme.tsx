import themes from "@/View/Appearance/Themes"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Theme
 * 
 * @returns 
 */
export default function () {

    /**
     * Dark
     * 
     */
    const dark = themes.find(theme => theme.key === "dark")

    /**
     * Light
     * 
     */
    const light = themes.find(theme => theme.key === "light")

    return <Container
        className={Appearance.theme.key !== "dark" ? "active" : ""}
        onClick={() => Appearance.theme = (Appearance.theme === dark ? light : dark) || Appearance.theme}
    />
}

/**
 * Container
 * 
 */
const Container = styled.div`
    cursor: pointer;
    zoom: 40%;
    font-size: 30%;
    position: relative;
    height: 16em;
    width: 30em;
    border-radius: 16em;
    transition: all 500ms ease-in-out;
    background: #423966;

    &:after {
        content: "";
        position: absolute;
        display: block;
        border-radius: 50%;
        transition: all 400ms ease-in-out;

        top: 3em;
        left: 3em;
        transform: rotate(-75deg);
        width: 10em;
        height: 10em;
        background: #423966;
        box-shadow:
            3em 2.5em 0 0em #D9FBFF inset,
            rgba(255, 255, 255, 0.1) 0em -7em 0 -4.5em,
            rgba(255, 255, 255, 0.1) 3em 7em 0 -4.5em,
            rgba(255, 255, 255, 0.1) 2em 13em 0 -4em,
            rgba(255, 255, 255, 0.1) 6em 2em 0 -4.1em,
            rgba(255, 255, 255, 0.1) 8em 8em 0 -4.5em,
            rgba(255, 255, 255, 0.1) 6em 13em 0 -4.5em,
            rgba(255, 255, 255, 0.1) -4em 7em 0 -4.5em,
            rgba(255, 255, 255, 0.1) -1em 10em 0 -4.5em;
    }

    &.active {
        background: #FFBF71;

        &:after {
            top: 4.5em;
            left: 18em;
            transform: rotate(0deg);
            width: 7em;
            height: 7em;
            background: #fff;
            box-shadow: 3em 3em 0 5em #fff inset,
                0 -5em 0 -2.7em #fff,
                3.5em -3.5em 0 -3em #fff,
                5em 0 0 -2.7em #fff,
                3.5em 3.5em 0 -3em #fff,
                0 5em 0 -2.7em #fff,
                -3.5em 3.5em 0 -3em #fff,
                -5em 0 0 -2.7em #fff,
                -3.5em -3.5em 0 -3em #fff;
        }
    }
`