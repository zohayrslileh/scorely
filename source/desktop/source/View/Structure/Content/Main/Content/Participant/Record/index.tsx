import TextInput from "@/View/Components/TextInput"
import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import Flex from "@/View/Components/Flex"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { useState } from "react"
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
     * Name
     * 
     */
    const [name, setName] = useState("")

    return <Container>
        <Flex>
            <Title><Lang>Participants</Lang></Title>
            <Button onClick={() => navigate("create")}>Create</Button>
        </Flex>
        <Flex>
            <TextInput placeholder="Search" type="text" value={name} onChange={setName} />
        </Flex>
        <Rows params={{ name }} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`