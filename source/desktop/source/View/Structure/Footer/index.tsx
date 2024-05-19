import themes from "@/View/Appearance/Themes"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container className="animation">
        {themes.map(theme => <button key={theme.key} onClick={() => Appearance.theme = theme} disabled={Appearance.theme === theme}>{theme.name}</button>)}
        <Link to="/connect">Connect</Link>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
`