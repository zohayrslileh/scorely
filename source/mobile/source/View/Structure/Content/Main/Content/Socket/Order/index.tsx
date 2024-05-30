import JsonView from "@/View/Components/JsonView"
import styled from "@emotion/styled"

/**
 * Order
 * 
 * @returns 
 */
export default function ({ value }: Props) {

    return <Container>
        <JsonView json={value} />
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    value: object
}

/**
 * Container
 * 
 */
const Container = styled.div`
`