import lightLogo from "@/Assets/Media/light-logo.png"
import darkLogo from "@/Assets/Media/dark-logo.png"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Logo
 * 
 * @returns 
 */
export default function (props: Omit<React.ComponentProps<typeof Container>, "src" | "alt">) {

    return <Container {...props} alt="" src={Appearance.theme.name === "dark" ? lightLogo : darkLogo} loading="eager" />
}

/**
 * Container
 * 
 */
const Container = styled.img`
    user-select: none;
    pointer-events: none;
`