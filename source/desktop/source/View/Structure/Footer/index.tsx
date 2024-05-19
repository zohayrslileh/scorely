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
        <select value={Language.value.key} onChange={event => Language.value = languages.find(language => language.key === event.target.value) || languages[0]}>
            {languages.map(language => <option key={language.key} value={language.key}>{language.name}</option>)}
        </select>
        <Link to="/connect">Connect</Link>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    display: flex;
    gap: 10px;
`