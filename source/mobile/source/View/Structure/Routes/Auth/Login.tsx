import PendingException from "@/View/Exception/Exceptions/Pending"
import TextInput from "@/Tools/MaterialUI/TextInput"
import Authentication from "@/Core/Authentication"
import useForm, { Form } from "@/Tools/Form"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import styled from "@emotion/styled"

/**
 * Login
 * 
 * @returns 
 */
export default function () {

    /**
     * Form
     * 
     */
    const { value, update } = useForm(() => new LoginForm)

    /**
     * Login
     * 
     */
    const login = Authentication.useLogin(value)

    // Pending status
    if (login.pending) return <Throw exception={new PendingException} />

    // Solve status
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

/**
 * Login Form
 * 
 */
class LoginForm {

    /**
     * Username
     * 
     */
    username: string | undefined

    /**
     * Password
     * 
     */
    password: string | undefined
}