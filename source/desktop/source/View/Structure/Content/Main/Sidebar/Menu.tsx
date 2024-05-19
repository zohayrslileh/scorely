import { LuLayoutDashboard, LuBox, LuSettings, LuUsers2, LuBanknote, LuFile, LuAreaChart, LuWallet, LuShoppingCart } from "react-icons/lu"
import { Link, useParams } from "react-router-dom"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Appearance from "@/View/Appearance"

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

        &.active {
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
        route: "",
        name: "Overview",
        Icon: LuLayoutDashboard
    },
    {
        route: "order",
        name: "Orders",
        Icon: LuShoppingCart
    },
    {
        route: "product",
        name: "Products",
        Icon: LuBox
    },
    {
        route: "client",
        name: "Clients",
        Icon: LuUsers2
    },
    {
        route: "cheque",
        name: "Cheques",
        Icon: LuBanknote
    },
    {
        route: "invoice",
        name: "Invoices",
        Icon: LuFile
    },
    {
        route: "estimate",
        name: "Estimates",
        Icon: LuFile
    },
    {
        route: "expense",
        name: "Expenses",
        Icon: LuWallet
    },
    {
        route: "statistics",
        name: "Statistics",
        Icon: LuAreaChart
    },
    {
        route: "settings",
        name: "Settings",
        Icon: LuSettings
    }
]