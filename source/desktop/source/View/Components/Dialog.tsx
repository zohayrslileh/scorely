import Appearance from "@/View/Appearance"
import { Dialog } from "@headlessui/react"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"

/**
 * Dialog
 * 
 * @returns 
 */
export default function ({ children, ...props }: React.ComponentProps<typeof Dialog>) {

    return <Dialog {...props}>
        <Container>
            {typeof children === "function" ? undefined : children}
        </Container>
    </Dialog>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 100px;
    min-height: 100px;
    width: fit-content;
    height: fit-content;
    border-radius: 10px;
    padding: 10px;
        
    animation: ${keyframes`

        0% {
            scale: 1.1;
            opacity: 0;
        }

        100% {
            scale: 1;
            opacity: 1;
        }
        
    `} ease 300ms;
`