import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"
import { useCallback } from "react"

/**
 * Dialog
 * 
 * @returns 
 */
export default function ({ isOpen, onBackDropClick, onClick, children, ...props }: Props) {

    /**
     * Click handle method
     * 
     */
    const clickHandle = useCallback(function (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {

        // Click
        if (onClick) onClick(event)

        // Back drop click
        if (event.target === event.currentTarget && onBackDropClick) onBackDropClick()

    }, [onBackDropClick, onClick])

    return isOpen ? <Container {...props} onClick={clickHandle}>
        <div id="body" className="animation">
            {typeof children === "function" ? undefined : children}
        </div>
    </Container> : null
}

/**
 * Props
 * 
 */
interface Props extends React.ComponentProps<typeof Container> {
    isOpen: boolean
    onBackDropClick?: () => void
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba(0.5)};
    backdrop-filter: blur(10px);
    position: fixed;
    z-index: 99999;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    display: grid;
    justify-items: center;
    align-items: center;

    > #body {
        background-color: ${() => Appearance.theme.schema.BACKGROUND_SECONDARY.rgba()};
        border-radius: 7px;
        padding: 20px;
    }
`