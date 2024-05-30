import TextInput from "@/View/Components/TextInput"
import Namespace from "@/Tools/Socket/Namespace"
import { Lang, useLang } from "@/Tools/Language"
import Button from "@/View/Components/Button"
import { PrimitiveOrder } from "@/Core/Order"
import { useCallback, useState } from "react"
import styled from "@emotion/styled"
import Header from "./Header"

/**
 * Order
 * 
 * @returns 
 */
export default function ({ namespace, value }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    /**
     * Score
     * 
     */
    const [score, setScore] = useState<undefined | string>(undefined)

    /**
     * Skip method
     * 
     * @returns
     */
    const skip = useCallback(async function () {

        await namespace.ask("skip", value.session.id, value.participant.id)

    }, [namespace, value])

    /**
     * Answer method
     * 
     * @returns
     */
    const answer = useCallback(async function () {

        await namespace.ask("answer", value.session.id, value.participant.id, Number(score))

    }, [namespace, value, score])

    return <Container className="animation">
        <Header sessionId={value.session.id} participantName={value.participant.name} />
        <TextInput placeholder={lang("The score")} value={score || ""} onChange={score => setScore(score || undefined)} />
        <Button onClick={skip}><Lang>Skip</Lang></Button>
        <Button onClick={answer}><Lang>Save</Lang></Button>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    namespace: Namespace
    value: PrimitiveOrder
}

/**
 * Container
 * 
 */
const Container = styled.div`
`