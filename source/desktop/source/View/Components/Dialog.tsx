import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Dialog
 * 
 * @returns 
 */
export default function ({ children, ...props }: React.ComponentProps<typeof Container>) {

    return <Container {...props}>
        {typeof children === "function" ? undefined : children}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
`