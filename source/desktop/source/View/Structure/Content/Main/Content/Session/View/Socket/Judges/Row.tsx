import LightButton from "@/View/Components/LightButton"
import Appearance from "@/View/Appearance"
import Grid from "@/View/Components/Grid"
import { FiTrash2 } from "react-icons/fi"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Judge from "@/Core/Judge"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ judge, onRemove }: Props) {

    return <Container>
        <p>{judge.name} 4.3 (3)</p>
        <Grid columns="1fr" gap="10px" id="control">
            <LightButton onClick={async () => await onRemove(judge)} id="delete"><FiTrash2 /><Lang>Delete</Lang></LightButton>
        </Grid>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    judge: Judge
    onRemove: (judge: Judge) => Promise<void>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background: ${() => Appearance.theme.schema.BACKGROUND_GRADIENT};
    display: grid;
    border-radius: 7px;
    width: -webkit-fill-available;
    min-height: 150px;
    height: 100%;
    position: relative;
    gap: 10px;
    grid-template-rows: 1fr auto;
    padding: 15px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        transform: scale(0.98);
    }

    > p {
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
        margin: auto;
    }

    > #control > button {
        border: 1px solid ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.1)};
        padding: 9px 15px;

        &#delete {
            background-color: #e14343;
            color: ${() => Appearance.schema.COLOR_LIGHT.rgba()};
        }
    }
`