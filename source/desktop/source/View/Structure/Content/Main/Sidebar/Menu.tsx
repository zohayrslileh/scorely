import { LuLayoutDashboard, LuBox, LuSettings, LuUsers2, LuBanknote, LuFile, LuAreaChart, LuWallet, LuShoppingCart } from "react-icons/lu"
import { Lang } from "@/Tools/Language"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"

/**
 * Menu
 * 
 * @returns 
 */
export default function () {

    return <Container>
        {items.map(item => (
            <Link key={item.route} to={item.route}>
                <item.Icon size={20} strokeWidth={1} />
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
    overflow: auto;
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