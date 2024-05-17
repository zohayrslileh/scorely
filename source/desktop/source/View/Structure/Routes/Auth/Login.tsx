import TextInput from "@/Tools/MaterialUI/TextInput"
import Authentication from "@/Core/Authentication"
import { useNavigate } from "react-router-dom"
import useForm, { Form } from "@/Tools/Form"
import styled from "@emotion/styled"
import { useCallback } from "react"

/**
 * Login
 * 
 * @returns 
 */
export default function () {

    const naviagte = useNavigate()

    const { value, update } = useForm(() => new LoginForm)

    const login = useCallback(async function () {

        await Authentication.login(value)

        naviagte("")

    }, [value])

    return <Container>

        <Form onSubmit={login}>
            <TextInput placeholder="Username" type="text" value={value.username || ""} onChange={value => update.username(value || undefined)} />
            <TextInput placeholder="Password" type="password" value={value.password || ""} onChange={value => update.password(value || undefined)} />
            <button>Login</button>
        </Form>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`

class LoginForm {
    username: string | undefined
    password: string | undefined
}