import LightButton from "@/View/Components/LightButton"
import { IoBackspaceOutline } from "react-icons/io5"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import styled from "@emotion/styled"

/**
 * Keyboard component
 * 
 * @returns
 */
export default function ({ value, onChange }: Props) {

    return (
        <Container className="animation">
            <div id="keys">
                <LightButton onClick={() => onChange(`${value}1`)}>1</LightButton>
                <LightButton onClick={() => onChange(`${value}2`)}>2</LightButton>
                <LightButton onClick={() => onChange(`${value}3`)}>3</LightButton>
                <LightButton onClick={() => onChange(`${value}4`)}>4</LightButton>
                <LightButton onClick={() => onChange(`${value}5`)}>5</LightButton>
                <LightButton onClick={() => onChange(`${value}6`)}>6</LightButton>
                <LightButton onClick={() => onChange(`${value}7`)}>7</LightButton>
                <LightButton onClick={() => onChange(`${value}8`)}>8</LightButton>
                <LightButton onClick={() => onChange(`${value}9`)}>9</LightButton>
                <LightButton onClick={() => onChange(`${value}.`)}>.</LightButton>
                <LightButton onClick={() => onChange(`${value}0`)}>0</LightButton>
                <LightButton className={value ? "" : "disable"} onClick={() => onChange(value.slice(0, - 1))}><IoBackspaceOutline /></LightButton>
            </div>
        </Container>
    )
}

/**
 * Props
 * 
 */
interface Props {
    value: string
    onChange: (value: string) => void
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    display: grid;
    grid-template-rows: 1fr;
    gap: 10px;
    direction: ltr;
    font-family: ${() => Appearance.schema.FONT_MEDIUM};

    > #keys {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        background-color: transparent;
        padding: 0;
        gap: 5px;
        user-select: none;

        > button {
            font-size: 25px;

            &:last-child {
                background-color: #e14343;
                color: white;
            }
        }
    }
`