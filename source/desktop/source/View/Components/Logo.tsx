import lightLogo from "@/View/Media/light-logo.png"
import darkLogo from "@/View/Media/dark-logo.png"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Logo
 * 
 * @returns 
 */
export default function (props: Omit<React.ComponentProps<typeof Container>, "src" | "alt">) {

    return <Container {...props} alt="" src={Appearance.theme.key === "dark" ? lightLogo : darkLogo} loading="eager" />
}

/**
 * Container
 * 
 */
const Container = styled.img`
    user-select: none;
    pointer-events: none;
`