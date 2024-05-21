import TextInput from "@/View/Components/TextInput"
import { Lang, useLang } from "@/Tools/Language"
import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import { useCallback, useState } from "react"
import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import styled from "@emotion/styled"
import Server from "@/Models/Server"
import { Form } from "@/Tools/Form"

/**
 * Login
 * 
 * @returns 
 */
export default function ({ value, onChange }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

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

        localStorage.clear()

        onChange(server)

        Server.value = server

        navigate(-1)

    }, [server])

    return <Container className="animation">

        <Logo width={200} id="logo" />

        <Form onSubmit={connect}>
            <TextInput placeholder={lang("Server URL")} type="text" value={server} onChange={setServer} />
            <Button><Lang>Connect</Lang></Button>
        </Form>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    width: fit-content;
    margin: auto;
    width: 300px;
    padding: 20px;
    display: grid;
    gap: 10px;

    > #logo {
        margin-inline: auto;
        margin-block: 25px;
        display: flex;
    }

    > form {
        display: grid;
        gap: 10px;
    }
`

/**
 * Props
 * 
 */
interface Props {
    value: string
    onChange: (value: string) => void
}