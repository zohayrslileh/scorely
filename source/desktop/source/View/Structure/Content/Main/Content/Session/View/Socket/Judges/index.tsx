import Judge, { PrimitiveJudge } from "@/Core/Judge"
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
 * Judges
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
     * Judges
     * 
     */
    const [judges, setJudges] = useState<Judge[]>(value)

    /**
     * On add judge
     * 
     */
    namespace.useOn("add-judge", function (primitiveJudge: PrimitiveJudge) {

        setJudges(judges => [...judges, new Judge(primitiveJudge)])
    })

    /**
     * On remove judge
     * 
     */
    namespace.useOn("remove-judge", function (id: number) {

        setJudges(judges => judges.filter(judge => judge.id !== id))
    })

    /**
     * Add judge method
     * 
     * @returns
     */
    const addJudge = useCallback(async function (judge: Judge) {

        try {

            await namespace.ask("add-judge", session.id, judge.id)

            setJudges(judges => [...judges, judge])

        } catch (exception) {

            alert(compiler(exception).message)

            throw exception
        }

    }, [session])

    /**
     * Remove judge method
     * 
     * @returns
     */
    const removeJudge = useCallback(async function (judge: Judge) {

        try {

            await namespace.ask("remove-judge", session.id, judge.id)

            setJudges(judges => judges.filter(item => item.id !== judge.id))

        } catch (exception) {

            alert(compiler(exception).message)

            throw exception
        }

    }, [session])

    return <Container>
        {judges.map(judge => <Row key={judge.id} judge={judge} onRemove={removeJudge} />)}
        <button onClick={() => setIsOpen(true)}><Lang>Add judge</Lang></button>
        <Dialog isOpen={isOpen} onBackDropClick={() => setIsOpen(false)}>
            <Search onAddJudge={addJudge} judges={judges} />
        </Dialog>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    namespace: Namespace
    value: Judge[]
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