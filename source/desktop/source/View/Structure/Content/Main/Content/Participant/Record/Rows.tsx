import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import PendingException from "@/View/Exception/Exceptions/Pending"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import { useEffect } from "react"
import Row from "./Row"

/**
 * Record
 * 
 * @returns 
 */
export default function ({ params }: Props) {

    /**
     * Search params
     * 
     */
    const [searchParams, setSearchParams] = useSearchParams()

    /**
     * Record promise
     * 
     */
    const record = usePromise(async () => await Participant.record(searchParams), [searchParams])

    /**
     * On Typing
     * 
     */
    useEffect(() => {

        // Typing Timeout
        const timeout = setTimeout(() => setSearchParams(params), 200)

        return () => clearTimeout(timeout)

    }, [params])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return <Container>
        {record.solve.map(participant => <Row participant={participant} />)}
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
    params: URLSearchParamsInit
}