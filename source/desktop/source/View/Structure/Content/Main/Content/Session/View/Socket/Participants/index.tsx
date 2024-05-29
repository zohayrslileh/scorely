import Participant, { PrimitiveParticipant } from "@/Core/Participant"
import Namespace from "@/Tools/Socket/Namespace"
import Dialog from "@/View/Components/Dialog"
import { useCallback, useState } from "react"
import Appearance from "@/View/Appearance"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Search from "./Search"

/**
 * Participants
 * 
 * @returns 
 */
export default function ({ namespace }: Props) {

    /**
     * Is open
     * 
     */
    const [isOpen, setIsOpen] = useState(false)

    /**
     * Participants
     * 
     */
    const [participants, setParticipants] = useState<Participant[]>([])

    /**
     * On add participant
     * 
     */
    namespace.useOn("add-participant", function (primitiveParticipant: PrimitiveParticipant) {

        setParticipants(participants => [...participants, new Participant(primitiveParticipant)])
    })

    /**
     * On remove participant
     * 
     */
    namespace.useOn("remove-participant", function (id: number) {

        setParticipants(participants => participants.filter(participant => participant.id !== id))
    })

    /**
     * Add participant method
     * 
     * @returns
     */
    const addParticipant = useCallback(async function (participant: Participant) {

        await namespace.ask("add-participant", participant.id)

        setParticipants(participants => [...participants, participant])

    }, [])

    return <Container>
        <button onClick={() => setIsOpen(true)}><Lang>Add participant</Lang></button>
        <b>{participants.length}</b>
        <Dialog isOpen={isOpen} onBackDropClick={() => setIsOpen(false)}>
            <Search onAddParticipant={addParticipant} />
        </Dialog>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    namespace: Namespace
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