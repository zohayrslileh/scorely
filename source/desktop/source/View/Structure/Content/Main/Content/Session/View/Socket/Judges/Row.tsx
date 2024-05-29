import Appearance from "@/View/Appearance"
import { FiTrash2 } from "react-icons/fi"
import styled from "@emotion/styled"
import Judge from "@/Core/Judge"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ judge }: Props) {

    return <Container>
        <p>{judge.name}</p>
        <FiTrash2 id="delete" />
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    judge: Judge
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    border: 1px solid ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.1)};
    display: grid;
    justify-items: center;
    align-items: center;
    border-radius: 7px;
    height: 150px;
    margin: auto;
    width: -webkit-fill-available;
    min-height: 150px;
    height: 100%;
    position: relative;

    > p {
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
    }

    > #delete {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 16px;
        cursor: pointer;
        color: #e14343;
    }
`