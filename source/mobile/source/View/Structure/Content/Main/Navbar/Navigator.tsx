import { IoIosArrowBack, IoIosArrowForward, IoIosRefresh } from "react-icons/io"
import LightButton from "@/View/Components/LightButton"
import { useNavigate } from "react-router-dom"
import Language from "@/View/Language"
import styled from "@emotion/styled"

/**
 * Navigator
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    return (
        <Container>
            <LightButton onClick={() => navigate(-1)}>{Language.value.direction === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}</LightButton>
            <LightButton onClick={() => navigate(1)}>{Language.value.direction === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}</LightButton>
            <LightButton onClick={() => location.reload()}><IoIosRefresh /></LightButton>
        </Container>
    )
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: flex;
    gap: 10px;
`