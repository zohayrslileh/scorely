import Participant, { PrimitiveParticipant } from "@/Core/Participant"
import compiler from "@/View/Exception/compiler"
import Namespace from "@/Tools/Socket/Namespace"
import Dialog from "@/View/Components/Dialog"
import { useCallback, useState } from "react"
import Appearance from "@/View/Appearance"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Session from "@/Core/Session"
import Search from "./Search"
import Row from "./Row"

/**
 * Participants
 * 
 * @returns 
 */
export default function ({ namespace, value, session }: Props) {

    /**
     * Is open
     * 
     */
    const [isOpen, setIsOpen] = useState(false)

    /**
     * Participants
     * 
     */
    const [participants, setParticipants] = useState<Participant[]>(value)

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

        try {

            await namespace.ask("add-participant", session.id, participant.id)

            setParticipants(participants => [...participants, participant])

        } catch (exception) {

            alert(compiler(exception).message)

            throw exception
        }

    }, [session])

    /**
     * Remove participant method
     * 
     * @returns
     */
    const removeParticipant = useCallback(async function (participant: Participant) {

        try {

            await namespace.ask("remove-participant", session.id, participant.id)

            setParticipants(participants => participants.filter(item => item.id !== participant.id))

        } catch (exception) {

            alert(compiler(exception).message)

            throw exception
        }

    }, [session])

    return <Container>
        {participants.map(participant => <Row key={participant.id} participant={participant} onRemove={removeParticipant} />)}
        <button onClick={() => setIsOpen(true)}><Lang>Add participant</Lang></button>
        <Dialog isOpen={isOpen} onBackDropClick={() => setIsOpen(false)}>
            <Search onAddParticipant={addParticipant} participants={participants} />
        </Dialog>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    namespace: Namespace
    value: Participant[]
    session: Session
}

/**
 * Container
 * 
 */
const Container = styled.div`
    border: 2px solid ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    border-radius: 7px;
    padding: 7px;
    overflow: auto;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(220px, auto));
    grid-template-rows: initial;
    gap: 10px;

    ::-webkit-scrollbar {
        display: none;
    }

    > button {
        color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.5)};
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
        background-color: transparent;
        border: 2px dashed;
        border-radius: 7px;
        cursor: pointer;
        height: 150px;
        padding: 0;
        width: -webkit-fill-available;
        min-height: 150px;
        height: 100%;
        
        &:hover {
            color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.7)};
            transform: scale(0.98);
        }
    }
`