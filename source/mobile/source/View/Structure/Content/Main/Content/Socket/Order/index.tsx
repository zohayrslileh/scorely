import JsonView from "@/View/Components/JsonView"
import Namespace from "@/Tools/Socket/Namespace"
import Button from "@/View/Components/Button"
import { PrimitiveOrder } from "@/Core/Order"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { useCallback } from "react"

/**
 * Order
 * 
 * @returns 
 */
export default function ({ namespace, value }: Props) {

    /**
     * Skip method
     * 
     * @returns
     */
    const skip = useCallback(async function () {

        await namespace.ask("skip", value.session.id, value.participant.id)

    }, [namespace, value])

    return <Container>
        <JsonView json={value} />
        <Button onClick={skip}><Lang>Skip</Lang></Button>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    namespace: Namespace
    value: PrimitiveOrder
}

/**
 * Container
 * 
 */
const Container = styled.div`
`