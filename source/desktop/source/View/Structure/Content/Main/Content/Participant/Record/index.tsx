import { useNavigate, useSearchParams } from "react-router-dom"
import TextInput from "@/View/Components/TextInput"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import Flex from "@/View/Components/Flex"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import useForm from "@/Tools/Form"
import { useEffect } from "react"
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
     * Search params
     * 
     */
    const [searchParams, setSearchParams] = useSearchParams()

    /**
     * Form
     * 
     */
    const { value, update } = useForm(() => ({
        name: searchParams.get("name") || ""
    }))

    /**
     * On Typing
     * 
     */
    useEffect(() => {

        // Typing Timeout
        const timeout = setTimeout(() => setSearchParams(value), 200)

        return () => clearTimeout(timeout)

    }, [value])

    return <Container>
        <Flex>
            <Title><Lang>Participants</Lang></Title>
            <Button onClick={() => navigate("create")}>Create</Button>
        </Flex>
        <Flex>
            <TextInput placeholder="Search" type="text" value={value.name} onChange={update.name} />
        </Flex>
        <Rows params={{ name: searchParams.get("name") || "" }} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`