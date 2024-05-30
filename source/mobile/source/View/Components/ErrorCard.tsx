import Appearance from "@/View/Appearance"
import { BiError } from "react-icons/bi"
import styled from "@emotion/styled"

/**
 * Error card component
 * 
 * @returns 
 */
export default function ({ message }: Props) {

    return <Container>
        <BiError />
        {message}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: #f54747;
    color: ${() => Appearance.schema.COLOR_LIGHT.rgba()};
    padding: 10px 10px;
    border-radius: 7px;
    height: fit-content;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;
`

/**
 * Props
 * 
 */
interface Props {
    message: string
}