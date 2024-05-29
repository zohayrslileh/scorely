import Dialog from "@/View/Components/Dialog"
import Appearance from "@/View/Appearance"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { useState } from "react"
import Search from "./Search"

/**
 * Participants
 * 
 * @returns 
 */
export default function () {

    /**
     * Is open
     * 
     */
    const [isOpen, setIsOpen] = useState(false)

    return <Container>
        <button onClick={() => setIsOpen(true)}><Lang>Add participant</Lang></button>
        <Dialog isOpen={isOpen} onBackDropClick={() => setIsOpen(false)}>
            <Search />
        </Dialog>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    border: 2px solid ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    border-radius: 7px;
    padding: 7px;
    display: grid;
    justify-items: center;
    align-items: center;

    > button {
        color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.5)};
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
        background-color: transparent;
        border: 2px dashed;
        border-radius: 7px;
        cursor: pointer;
        width: 200px;
        height: 150px;
        padding: 0;

        &:hover {
            color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.7)};
        }
    }

    > #dialog {
        position: fixed;
        z-index: 99999;
        background-color: red;
    }
`