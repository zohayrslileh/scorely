import LightButton from "@/View/Components/LightButton"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Record More Component
 * 
 */
export default function ({ record }: Props) {

    return (
        <Container>
            <p><Lang>Display</Lang> {record.rows.length} <Lang>from</Lang> {record.response?.count || 0}</p>
            <LightButton onClick={record.showMore} className={record.loadingMore || !record.hasMore ? "disable" : ""}><Lang>Show more</Lang></LightButton>
        </Container>
    )
}

/**
 * Props
 * 
 */
interface Props {
    record: any
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: end;
    user-select: none;
    
    > p {
        opacity: 0.5;
    }
`