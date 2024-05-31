import LightButton from "@/View/Components/LightButton"
import { LuEye, LuEyeOff } from "react-icons/lu"
import Button from "@/View/Components/Button"
import Participant from "@/Core/Participant"
import Appearance from "@/View/Appearance"
import Grid from "@/View/Components/Grid"
import { FiTrash2 } from "react-icons/fi"
import { Lang } from "@/Tools/Language"
import { LuStar } from "react-icons/lu"
import styled from "@emotion/styled"
import { useState } from "react"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ participant, onRemove, onAskRate }: Props) {

    /**
     * Hide state
     * 
     */
    const [hide, setHide] = useState(true)

    /**
     * Rating
     * 
     */
    const [ratingsCount, average] = participant.rating

    return <Container>
        <div id="header">
            <div id="average">
                <LuStar size={12} />
                <p id="value" className={hide ? "hide" : ""}>{average.toFixed(2)}</p>
                {hide ? <LuEyeOff onClick={() => setHide(false)} id="eye" /> : <LuEye onClick={() => setHide(true)} id="eye" />}
            </div>
            <p id="ratings-count">{ratingsCount}</p>
        </div>
        <p>{participant.name}</p>
        <Grid columns="1fr 1fr" gap="10px" id="control">
            <Button onClick={async () => await onAskRate(participant)}><LuStar /><Lang>Rate</Lang></Button>
            <LightButton onClick={async () => await onRemove(participant)} id="delete"><FiTrash2 /><Lang>Delete</Lang></LightButton>
        </Grid>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    participant: Participant
    onRemove: (participant: Participant) => Promise<void>
    onAskRate: (participant: Participant) => Promise<void>
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
    grid-template-rows: auto 1fr auto;
    padding: 15px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        transform: scale(0.98);
    }

    > #header {
        color: #299c29;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: space-between;

        p {
            margin: 0;
            font-family: ${() => Appearance.schema.FONT_MEDIUM};
            font-size: 13px;
        }

        > #average {
            display: flex;
            align-items: center;
            gap: 5px;

            > #eye {
                color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.5)};
                margin-inline-start: 10px;
            }

            > #value.hide {
                filter: blur(3px);
            }
        }

        > #ratings-count {
            color: ${() => Appearance.schema.COLOR_BLUE.rgba()};
        }
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