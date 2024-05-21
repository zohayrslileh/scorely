import { LuAirVent } from "react-icons/lu"
import styled from "@emotion/styled"

/**
 * Empty record
 * 
 */
export default styled(LuAirVent)<{
    $top?: string
}>`
    font-size: 50px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: ${props => props.$top || "30px"};
    bottom: 0;
    user-select: none;
    opacity: 0.2;
    stroke-width: 1px;
`