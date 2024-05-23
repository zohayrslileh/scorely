import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import Appearance from "@/View/Appearance"
import Flex from "@/View/Components/Flex"
import Grid from "@/View/Components/Grid"
import Exception from "@/View/Exception"
import { Lang } from "@/Tools/Language"
import Session from "@/Core/Session"
import styled from "@emotion/styled"
import { useCallback } from "react"
import Rows from "./Rows"

/**
 * Record
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    /**
     * Open method
     * 
     * @returns
     */
    const open = useCallback(async function () {

        const session = await Session.create()

        navigate(session.id.toString())

    }, [])

    return <Container gap="10px" rows="auto auto 1fr">
        <Flex>
            <Title><Lang>Sessions</Lang></Title>
            <Button onClick={open} pending={null}><Lang>Open new session</Lang></Button>
        </Flex>
        <div id="rows">
            <Exception>
                <Rows />
            </Exception>
        </div>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Grid)`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > #rows {
        position: relative;
        overflow-y: auto;
        height: 0px;
        flex: auto;
        border: 2px solid ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
        border-radius: 7px;
        padding: 7px;

        ::-webkit-scrollbar {
            display: none;
        }
    }
`