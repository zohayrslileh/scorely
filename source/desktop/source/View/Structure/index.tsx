import styled from "@emotion/styled"
import Welcome from "./Welcome"

/**
 * Structure
 * 
 * @returns 
 */
export default function () {

    return true ? <Welcome /> : <Container />
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    height: 100%;
`