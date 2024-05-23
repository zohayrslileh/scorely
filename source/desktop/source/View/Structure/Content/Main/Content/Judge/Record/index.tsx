import TextInput from "@/View/Components/TextInput"
import { Lang, useLang } from "@/Tools/Language"
import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Title from "@/View/Components/Title"
import Flex from "@/View/Components/Flex"
import Grid from "@/View/Components/Grid"
import Exception from "@/View/Exception"
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
     * Lang
     * 
     */
    const lang = useLang()

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
            <Title><Lang>Judges</Lang></Title>
            <Button onClick={() => navigate("create")}><Lang>Add new</Lang></Button>
        </Flex>
        <Grid>
            <TextInput placeholder={lang("Search")} type="search" value={value.name} onChange={update.name} />
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
        overflow-y: auto;
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