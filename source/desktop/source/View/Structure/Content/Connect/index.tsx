import TextInput from "@/View/Components/TextInput"
import { useNavigate } from "react-router-dom"
import { useCallback, useState } from "react"
import Card from "@/View/Components/Card"
import Server from "@/Models/Server"
import styled from "@emotion/styled"
import { Form } from "@/Tools/Form"

/**
 * Connect
 * 
 * @returns 
 */
export default function ({ value, onChange }: Props) {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    /**
     * Server
     * 
     */
    const [server, setServer] = useState(value)

    /**
     * Connect method
     * 
     * @returns
     */
    const connect = useCallback(function () {

        onChange(server)

        Server.value = server

        navigate(-1)

    }, [server])

    return <Container className="animation">
        <Form onSubmit={connect}>
            <TextInput type="text" value={server} onChange={setServer} />
            <button>Connect</button>
        </Form>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
`

/**
 * Props
 * 
 */
interface Props {
    value: string
    onChange: (value: string) => void
}