import TextInput from "@/View/Components/TextInput"
import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import Flex from "@/View/Components/Flex"
import Grid from "@/View/Components/Grid"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import useForm from "@/Tools/Form"
import Rows from "./Rows"

/**
 * Record
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    /**
     * Filter
     * 
     */
    const { value, update } = useForm(() => new Filter)

    return <Container gap="10px" rows="auto auto 1fr">
        <Flex>
            <Title><Lang>Participants</Lang></Title>
            <Button onClick={() => navigate("create")}>Create</Button>
        </Flex>
        <Grid>
            <TextInput placeholder="Search" type="text" value={value.name} onChange={update.name} />
        </Grid>
        <Rows filter={value} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Grid)`
    height: 100%;
`

/**
 * Filter
 * 
 */
class Filter {
    name: string = ""
}