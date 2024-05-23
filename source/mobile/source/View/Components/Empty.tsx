import { LuWind } from "react-icons/lu"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Logo
 * 
 * @returns 
 */
export default function (props: React.ComponentProps<typeof Container>) {

    return <Container {...props}>
        <p><Lang>No results found</Lang></p>
        <LuWind size={25} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    display: grid;
    justify-items: center;
    pointer-events: none;
    user-select: none;
    opacity: 0.3;
`