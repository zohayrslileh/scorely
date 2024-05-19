import TextInput from "@/Tools/MaterialUI/TextInput"
import { useNavigate } from "react-router-dom"
import { useCallback, useState } from "react"
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

    return <Container>
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
const Container = styled.div`
`

/**
 * Props
 * 
 */
interface Props {
    value: string
    onChange: (value: string) => void
}