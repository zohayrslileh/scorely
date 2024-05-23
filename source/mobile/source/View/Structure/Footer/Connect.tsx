import { PiPlugsConnected } from "react-icons/pi"
import Appearance from "@/View/Appearance"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"

/**
 * Connect
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <PiPlugsConnected size={17} />
        <Link to="/connect">Connect (v0.1.1)</Link>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    user-select: none;
    gap: 10px;

    > a {
        text-decoration: none;
        color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
    }
`