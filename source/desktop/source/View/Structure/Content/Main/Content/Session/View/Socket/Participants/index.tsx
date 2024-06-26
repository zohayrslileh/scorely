import Participant, { PrimitiveParticipant } from "@/Core/Participant"
import LightButton from "@/View/Components/LightButton"
import { writeBinaryFile } from "@tauri-apps/api/fs"
import { RiFileExcel2Line } from "react-icons/ri"
import compiler from "@/View/Exception/compiler"
import Namespace from "@/Tools/Socket/Namespace"
import * as dialog from "@tauri-apps/api/dialog"
import { Lang, useLang } from "@/Tools/Language"
import Dialog from "@/View/Components/Dialog"
import { useCallback, useState } from "react"
import Appearance from "@/View/Appearance"
import usePromise from "@/Tools/Promise"
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
     * Lang
     * 
     */
    const lang = useLang()

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
    namespace.useOn("add-participant", function (primitiveParticipant: PrimitiveParticipant, rating: [number, number]) {

        // Create participant
        const participant = new Participant(primitiveParticipant)

        // Set rating
        participant.rating = rating

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
     * On rating
     * 
     */
    namespace.useOn("rating", function (primitiveParticipant: PrimitiveParticipant, rating: [number, number]) {

        // Update Participants
        setParticipants(function (participants) {

            return participants.map(function (participant) {

                // Set rating
                if (primitiveParticipant.id === participant.id) participant.rating = rating

                return participant
            })
        })
    })

    /**
     * Add participant method
     * 
     * @returns
     */
    const addParticipant = useCallback(async function (participant: Participant) {

        try {

            const rating = await namespace.ask<[number, number]>("add-participant", session.id, participant.id)

            participant.rating = rating

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

    /**
     * Ask rate method
     * 
     * @returns
     */
    const askRate = useCallback(async function (participant: Participant) {

        try {

            const response = await namespace.ask("ask-rate", session.id, participant.id)

            console.log(response)

        } catch (exception) {

            alert(compiler(exception).message)

            throw exception
        }

    }, [session])

    /**
     * Export excel method
     * 
     * @returns
     */
    const exportExcel = useCallback(async function () {

        try {

            // Excel
            const excel = await session.exportExcel()

            // Ask save path
            const path = await dialog.save({
                title: lang("Export"),
                defaultPath: `${lang("Session")} ${session.id}.xlsx`
            })

            // Check path
            if (!path) throw new Error("Path is Empty")

            // Save
            await writeBinaryFile(path, excel)

        } catch (exception) {

            alert(compiler(exception).message)

            throw exception
        }

    }, [session])

    /**
     * Initialize participants promise
     * 
     */
    usePromise(async () => await namespace.ask("initialize-participants", session.id), [])

    return <Container>
        <div id="header">
            <h4><Lang>Participants</Lang></h4>
            <LightButton onClick={exportExcel}><RiFileExcel2Line /><Lang>Export</Lang></LightButton>
        </div>
        <div id="rows">
            {participants.map(participant => <Row key={participant.id} participant={participant} onRemove={removeParticipant} onAskRate={askRate} />)}
            <button onClick={() => setIsOpen(true)}><Lang>Add participant</Lang></button>
            <Dialog isOpen={isOpen} onBackDropClick={() => setIsOpen(false)}>
                <Search onAddParticipant={addParticipant} participants={participants} />
            </Dialog>
        </div>
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
    display: grid;
    gap: 10px;
    grid-template-rows: auto 1fr;
    overflow: auto;

    > #header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        > h4 {
            margin: 7px;
            font-size: 16px;
            opacity: 0.5;
        }
    }

    > #rows {
        overflow: auto;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: repeat(auto-fit, minmax(220px, auto));
        grid-template-rows: initial;
        gap: 10px;

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

        ::-webkit-scrollbar {
            display: none;
        }
    }
`