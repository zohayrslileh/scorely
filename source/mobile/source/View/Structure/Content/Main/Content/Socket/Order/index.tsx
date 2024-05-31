import { useCallback, useEffect, useState } from "react"
import Keyboard from "@/View/Components/Keyboard"
import Namespace from "@/Tools/Socket/Namespace"
import compiler from "@/View/Exception/compiler"
import Button from "@/View/Components/Button"
import { PrimitiveOrder } from "@/Core/Order"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Header from "./Header"

/**
 * Order
 * 
 * @returns 
 */
export default function ({ namespace, value }: Props) {

    /**
     * Focus
     * 
     */
    const [focus, setFocus] = useState<"score" | "penalties">("score")

    /**
     * Score
     * 
     */
    const [score, setScore] = useState<undefined | string>(undefined)

    /**
     * Penalties
     * 
     */
    const [penalties, setPenalties] = useState<undefined | string>(undefined)

    /**
     * Value focus
     * 
     */
    const valueFocus = focus === "score" ? score : penalties

    /**
     * Set value focus method
     * 
     * @returns
     */
    const setValueFocus = useCallback(function (value: string) {

        if (focus === "score") setScore(value || undefined)

        else setPenalties(value ? value.slice(0, 5) : undefined)

    }, [focus])

    /**
     * Skip method
     * 
     * @returns
     */
    const skip = useCallback(async function () {

        try {

            await namespace.ask("skip", value.session.id, value.participant.id)

        } catch (exception) {

            alert(compiler(exception).message)
        }

    }, [namespace, value])

    /**
     * Answer method
     * 
     * @returns
     */
    const answer = useCallback(async function () {

        try {

            await namespace.ask("answer", value.session.id, value.participant.id, Number(score), Number(penalties))

        } catch (exception) {

            alert(compiler(exception).message)
        }

    }, [namespace, value, score, penalties])

    /**
     * On change value
     * 
     */
    useEffect(function () {

        setScore(undefined)

        setPenalties(undefined)

    }, [value])

    return <Container className="animation">
        <Header sessionId={value.session.id} participantName={value.participant.name} />
        <Card id="form">
            <div id="score" className={`field ${focus === "score" ? "focus" : ""}`} onClick={() => setFocus("score")}>
                <p id="label"><Lang>Score</Lang></p>
                <p id="value">{score}</p>
            </div>
            {value.judge.primary && <div id="penalties" className={`field ${focus === "penalties" ? "focus" : ""}`} onClick={() => setFocus("penalties")}>
                <p id="label"><Lang>Penalties</Lang></p>
                <p id="value">{penalties}</p>
            </div>}
        </Card>
        <Keyboard value={valueFocus || ""} onChange={setValueFocus} />
        <div id="control">
            <Button onClick={answer}><Lang>Save</Lang></Button>
            <Button onClick={skip} className="skip"><Lang>Skip</Lang></Button>
        </div>
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
    display: grid;
    gap: 10px;
    grid-template-rows: auto auto 1fr 70px;

    > #form {
        display: grid;
        gap: 10px;

        p {
            margin: 0;
        }

        > .field {
            background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
            border-radius: 7px;
            padding: 20px;
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            gap: 10px;
            border: 2px solid transparent;

            &.focus {
                border-color: ${() => Appearance.theme.schema.FORCE_COLOR.rgba(0.2)};
            }

            > #label {
                opacity: 0.3;
            }

            > #value {
                text-align: center;
                font-family: ${() => Appearance.schema.FONT_BOLD};
                font-size: 22px;
                line-height: 0;
                color: green;
            }
        }
    }

    > #control {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        
        > button {
            font-size: 17px;
        }

        > .skip {
            background-color: #e14343;
        }
    }
`