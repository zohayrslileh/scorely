import styled from "@emotion/styled"

/**
 * Cell Component
 * 
 */
export default function ({ children, ...props }: Props) {

    return (
        <Container {...props} title={typeof children === "string" ? children : undefined}>
            <div id="content">{children}</div>
        </Container>
    )
}

/**
 * Props
 * 
 */
interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
}

/**
 * Container
 * 
 */
const Container = styled.td`

    > #content {
        padding: 1px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`