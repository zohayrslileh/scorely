import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import Flex from "@/View/Components/Flex"
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

    return <Container>
        <Flex>
            <Title><Lang>Participants</Lang></Title>
            <Button onClick={() => navigate("create")}>Create</Button>
        </Flex>
        <Rows />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`