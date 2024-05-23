import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import Flex from "@/View/Components/Flex"
import Grid from "@/View/Components/Grid"
import Exception from "@/View/Exception"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
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

    return <Container gap="10px" rows="auto auto 1fr">
        <Flex>
            <Title><Lang>Sessions</Lang></Title>
            <Button onClick={() => navigate("create")}><Lang>Add new</Lang></Button>
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

        ::-webkit-scrollbar {
            display: none;
        }
    }
`