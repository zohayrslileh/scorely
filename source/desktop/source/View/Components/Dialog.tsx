import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Dialog
 * 
 * @returns 
 */
export default function ({ isOpen, children, ...props }: Props) {

    return isOpen ? <Container {...props}>
        {typeof children === "function" ? undefined : children}
    </Container> : null
}

/**
 * Props
 * 
 */
interface Props extends React.ComponentProps<typeof Container> {
    isOpen: boolean
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
`