import TextInput from "@/View/Components/TextInput"
import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import Flex from "@/View/Components/Flex"
import Grid from "@/View/Components/Grid"
import Exception from "@/View/Exception"
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
        <div id="rows">
            <Exception>
                <Rows filter={value} />
            </Exception>
        </div>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Grid)`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > #rows {
        position: relative;
        overflow: auto;
        height: 0px;
        flex: auto;

        ::-webkit-scrollbar {
            display: none;
        }
    }
`

/**
 * Filter
 * 
 */
class Filter {
    name: string = ""
}