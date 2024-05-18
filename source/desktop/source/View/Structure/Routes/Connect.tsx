import Server from "@/Models/Server"
import TextInput from "@/Tools/MaterialUI/TextInput"
import styled from "@emotion/styled"
import { useCallback, useState } from "react"

/**
 * Connect
 * 
 * @returns 
 */
export default function ({ value, onChange }: Props) {

    const [server, setServer] = useState(value)

    const connect = useCallback(function () {

        onChange(server)

        Server.value = server

    }, [server])

    return <Container>
        <TextInput type="text" value={server} onChange={setServer} />
        <button onClick={connect}>Connect</button>
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