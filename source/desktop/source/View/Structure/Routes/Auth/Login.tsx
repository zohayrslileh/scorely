import TextInput from "@/Tools/MaterialUI/TextInput"
import Authentication from "@/Core/Authentication"
import useForm, { Form } from "@/Tools/Form"
import { Navigate } from "react-router-dom"
import styled from "@emotion/styled"

/**
 * Login
 * 
 * @returns 
 */
export default function () {

    const { value, update } = useForm(() => new LoginForm)

    const login = Authentication.useLogin(value)

    if (login.solve) return <Navigate to="/" />

    return <Container>

        <Form onSubmit={login.execute}>
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