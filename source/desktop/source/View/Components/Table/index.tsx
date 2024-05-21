import Language from "@/View/Language"
import styled from "@emotion/styled"
import Column from "./Column"
import Head from "./Head"
import Cell from "./Cell"

/**
 * Table Component
 * 
 */
export default function ({ children, ...props }: React.ComponentProps<typeof Container>) {

    return (
        <Container {...props}>
            <table>
                {children}
            </table>
        </Container>
    )
}

export { Column, Head, Cell }

/**
 * Container
 * 
 */
const Container = styled.div<{
    $width?: string
    $height?: string
}>`
    border: 2px solid red;
    width: ${props => props.$width || "initial"};
    height: ${props => props.$height || "initial"}; 
    font-family: red;
    box-sizing: border-box;
    flex-direction: column;
    border-radius: 10px;
    position: relative;
    font-size: 0.9em;
    overflow: auto;
    display: flex;

    // Table
    > table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;

        // TR
        tr {
            
            // TH
            > th {
                overflow-y: initial;
                text-align: start;
                padding: 10px 15px;
                position: sticky;
                overflow-x: clip;
                z-index: 2;
                top: 0;

                // First child
                &:first-child {
                    z-index: 4 !important;
                    position: sticky;
                    ${() => Language.value.direction === "rtl" ? "right: 0;" : "left: 0;"}
                }

                // Last child
                &:last-child {
                    z-index: 4 !important;
                    position: sticky;
                    ${() => Language.value.direction === "rtl" ? "left: 0;" : "right: 0;"}
                }

                // Before
                &::before {
                    box-shadow: 0 -12px 16px 12px red;
                    background-color: red;
                    position: absolute;
                    display: block;
                    height: 100%;
                    width: 100%;
                    content: '';
                    z-index: -1;
                    left: 0;
                    top: 0;
                }
            }

            // TD
            > td {
                padding: 10px 15px;
                position: relative;
                overflow: hidden;
                user-select: text;
                z-index: 1;
                
                // First child
                &:first-child {
                    overflow-y: clip;
                    overflow-x: unset;
                    position: sticky;
                    z-index: 3;
                    ${() => Language.value.direction === "rtl" ? "right: 0;" : "left: 0;"}

                    // Before
                    &::before {
                        box-shadow: ${() => Language.value.direction === "rtl" ? "12px" : "-12px"} 0 16px 12px red;
                    }
                }

                // Last child
                &:last-child {
                    overflow-y: clip;
                    overflow-x: unset;
                    position: sticky;
                    z-index: 3;
                    ${() => Language.value.direction === "rtl" ? "left: 0;" : "right: 0;"}

                    // Before
                    &::before {
                        box-shadow: ${() => Language.value.direction === "rtl" ? "-12px" : "12px"} 0 16px 12px red;
                    }
                }

                // Before
                &::before {
                    border-block-start: 1px solid red;
                    background-color: red;
                    position: absolute;
                    display: block;
                    height: 100%;
                    width: 100%;
                    content: '';
                    z-index: -1;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
`
