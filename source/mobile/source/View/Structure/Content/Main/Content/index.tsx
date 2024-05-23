import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
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
`