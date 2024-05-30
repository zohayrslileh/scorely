import TextInput from "@/View/Components/TextInput"
import { Lang, useLang } from "@/Tools/Language"
import Participant from "@/Core/Participant"
import Title from "@/View/Components/Title"
import Appearance from "@/View/Appearance"
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
export default function ({ onAddParticipant, participants }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    /**
     * Filter
     * 
     */
    const { value, update } = useForm(() => new Filter)

    return <Container gap="10px" rows="auto auto 1fr">
        <Title><Lang>Participants</Lang></Title>
        <Grid>
            <TextInput placeholder={lang("Search")} type="search" value={value.name} onChange={update.name} />
        </Grid>
        <div id="rows">
            <Exception>
                <Rows filter={value} onAddParticipant={onAddParticipant} participants={participants} />
            </Exception>
        </div>
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    onAddParticipant: (participant: Participant) => Promise<void>
    participants: Participant[]
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

    > h2 {
        margin-bottom: 7px;
        margin-inline-start: 7px;
    }

    > #rows {
        position: relative;
        overflow-y: auto;
        height: 0px;
        flex: auto;
        border: 2px solid ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
        border-radius: 7px;
        padding: 7px;
        width: 500px;
        height: 430px;

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