import PendingException from "@/View/Exception/Exceptions/Pending"
import Participant from "@/Core/Participant"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import Table from "@/View/Components/Table"
import Head from "@/View/Components/Table/Head"
import Column from "@/View/Components/Table/Column"
import Cell from "@/View/Components/Table/Cell"

/**
 * Record
 * 
 * @returns 
 */
export default function () {

    /**
     * Record
     * 
     */
    const record = usePromise(async () => await Participant.record(), [])

    // Pending status
    if (record.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (record.exception) return <Throw exception={record.exception.current} />

    return <Container>
        <Table $width="100%" $height="auto">
            <Head height="50px">
                <Column width="120px">XXX</Column>
                <Column width="300px">#</Column>
            </Head>
            <tbody>
                <tr>
                    <Cell>BBB</Cell>
                    <Cell>CCC</Cell>
                </tr>
            </tbody>
        </Table>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`