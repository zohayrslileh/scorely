import { useCallback, useContext, useState } from "react"
import LightButton from "@/View/Components/LightButton"
import Authentication from "@/Core/Authentication"
import { IoLogOutOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { LuUser } from "react-icons/lu"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * User
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
     * User
     * 
     */
    const user = useContext(Authentication.context)

    /**
     * Active state
     * 
     */
    const [active, setActive] = useState(false)

    /**
     * Logout method
     * 
     * @returns
     */
    const logout = useCallback(function () {

        Authentication.logout()

        navigate("/auth")

    }, [])

    return (
        <Container onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <div id="username">
                <LuUser />
                <p>{user?.username}</p>
            </div>
            {active && <div id="list" className="animation">
                <Card id="body">
                    <LightButton onClick={logout}><IoLogOutOutline /><Lang>Logout</Lang></LightButton>
                </Card>
            </div>}
        </Container>
    )
}

/**
 * Container
 * 
 */
const Container = styled.div`
    position: relative;
    display: grid;
    z-index: 99;

    > #username {
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;
        border: 1px solid ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.1)};
        padding: 7px 10px;
        position: relative;
        z-index: 1;
        color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
        background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba(0.8)};
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
        border-radius: 7px;

        > p {
            margin: 0;
        }
    }

    > #list {
        position: absolute;
        justify-self: end;
        display: grid;
        min-width: 200px;

        > #body {
            border-radius: 7px;
            padding: 10px;
            box-sizing: border-box;
            display: grid;
            gap: 20px;
            top: 47px;
            position: relative;
            border: 1px solid ${() => Appearance.theme.schema.CONTENT_COLOR.rgba(0.1)};

            > p {
                text-align: center;
                margin: 0;

                > b {
                    color: green;
                }
            }
        }
    }
`