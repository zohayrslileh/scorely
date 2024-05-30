import Judge, { PrimitiveJudge } from "@/Core/Judge"
import compiler from "@/View/Exception/compiler"
import Namespace from "@/Tools/Socket/Namespace"
import Dialog from "@/View/Components/Dialog"
import { useCallback, useState } from "react"
import Appearance from "@/View/Appearance"
import usePromise from "@/Tools/Promise"
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
     * On online judges
     * 
     */
    namespace.useOn("online-judges", function (onlineJudges: PrimitiveJudge[]) {

        // Update Judges
        setJudges(function (judges) {

            return judges.map(function (judge) {

                // Set is online
                judge.isOnline = !!onlineJudges.find(onlineJudge => onlineJudge.id === judge.id)

                return judge
            })
        })
    })

    /**
     * On pending orders
     * 
     */
    namespace.useOn("pending-orders", function (primitiveJudge: PrimitiveJudge, pendingOrders: number) {

        // Update Judges
        setJudges(function (judges) {

            return judges.map(function (judge) {

                // Set pending orders
                if (primitiveJudge.id === judge.id) judge.pendingOrders = pendingOrders

                return judge
            })
        })
    })

    /**
     * On judge connect
     * 
     */
    namespace.useOn("judge-connect", function (primitiveJudge: PrimitiveJudge) {

        // Update Judges
        setJudges(function (judges) {

            return judges.map(function (judge) {

                // Set is online
                if (judge.id === primitiveJudge.id) judge.isOnline = true

                return judge
            })
        })
    })

    /**
     * On judge desconnect
     * 
     */
    namespace.useOn("judge-desconnect", function (primitiveJudge: PrimitiveJudge) {

        // Update Judges
        setJudges(function (judges) {

            return judges.map(function (judge) {

                // Set is online
                if (judge.id === primitiveJudge.id) judge.isOnline = false

                return judge
            })
        })
    })

    /**
     * On add judge
     * 
     */
    namespace.useOn("add-judge", function (primitiveJudge: PrimitiveJudge, isOnline: boolean, pendingOrders: number) {

        // Create judge
        const judge = new Judge(primitiveJudge)

        // Set is online
        judge.isOnline = isOnline

        // Set pending orders
        judge.pendingOrders = pendingOrders

        setJudges(judges => [...judges, judge])
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

            const [isOnline, pendingOrders] = await namespace.ask<[boolean, number]>("add-judge", session.id, judge.id)

            judge.isOnline = isOnline

            judge.pendingOrders = pendingOrders

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

    /**
     * Initialize judges promise
     * 
     */
    usePromise(async () => await namespace.ask("initialize-judges", session.id), [])

    return <Container>
        <h4><Lang>Judges</Lang></h4>
        <div id="rows">
            {judges.map(judge => <Row key={judge.id} judge={judge} onRemove={removeJudge} />)}
            <button onClick={() => setIsOpen(true)}><Lang>Add judge</Lang></button>
            <Dialog isOpen={isOpen} onBackDropClick={() => setIsOpen(false)}>
                <Search onAddJudge={addJudge} judges={judges} />
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
    display: grid;
    gap: 10px;
    grid-template-rows: auto 1fr;
    overflow: auto;

    > h4 {
        margin: 7px;
        font-size: 16px;
        opacity: 0.5;
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