import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import Logo from "@/View/Components/Logo"
import Exception from "@/View/Exception"
import styled from "@emotion/styled"
import { Suspense } from "react"
import Order from "./Order"

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <Container>

        <Exception>

            <Suspense fallback={<Throw exception={new PendingException} />}>

                <Logo width={200} id="logo" />

                <Order />

            </Suspense>

        </Exception>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    grid-area: content;
    position: relative;
    padding: 20px;
    overflow: auto;
    display: grid;

    > #logo {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        opacity: 0.1;
    }
`