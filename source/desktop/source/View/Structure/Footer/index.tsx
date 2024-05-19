import languages from "@/View/Language/Languages"
import themes from "@/View/Appearance/Themes"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { Link } from "react-router-dom"
import Language from "@/View/Language"
import styled from "@emotion/styled"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container className="animation">
        {themes.map(theme => <button key={theme.key} onClick={() => Appearance.theme = theme} disabled={Appearance.theme === theme}>{theme.name}</button>)}
        {languages.map(language => <button key={language.key} onClick={() => Language.value = language} disabled={Language.value === language}>{language.name}</button>)}
        <Link to="/connect">Connect</Link>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
`