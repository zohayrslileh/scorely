import { LuStar, LuUsers2, LuUsers } from "react-icons/lu"
import { Link, useParams } from "react-router-dom"
import Appearance from "@/View/Appearance"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Menu
 * 
 * @returns 
 */
export default function () {

    /**
     * Params
     * 
     */
    const params = useParams()

    /**
     * This route
     * 
     */
    const thisRoute = params['*']?.split('/')[0]

    return <Container>
        {items.map(item => (
            <Link key={item.route} to={item.route} className={thisRoute === item.route ? "active" : undefined}>
                <item.Icon size={20} strokeWidth={1.5} />
                <p><Lang>{item.name}</Lang></p>
            </Link>
        ))}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    overflow: hidden;
    padding: 10px;
    display: grid;
    gap: 10px;
    height: fit-content;

    > a {
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
        display: flex;
        align-items: center;
        gap: 10px;
        color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
        text-decoration: none;
        padding-inline-end: 50px;
        padding-inline-start: 15px;
        border-radius: 10px;

        &.active, &:hover {
            background: ${() => Appearance.schema.COLOR_BLUE.rgba()};
            color: ${() => Appearance.schema.COLOR_LIGHT.rgba()};
        }

        > p {
            margin: 15px;
        }
    }
`

/**
 * Items
 * 
 */
const items = [
    {
        route: "session",
        name: "Sessions",
        Icon: LuStar
    },
    {
        route: "judge",
        name: "Judges",
        Icon: LuUsers
    },
    {
        route: "participant",
        name: "Participants",
        Icon: LuUsers2
    }
]