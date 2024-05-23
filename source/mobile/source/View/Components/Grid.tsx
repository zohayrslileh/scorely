import styled from "@emotion/styled"

/**
 * Grid component
 * 
 */
export default styled.div<{
    columns?: string
    rows?: string
    gap?: string
}>`
    position: relative;
    grid-template-columns: ${props => props.columns || "initial"};
    grid-template-rows: ${props => props.rows || "initial"};
    gap: ${props => props.gap || "initial"};
    overflow: auto;
    display: grid;
`