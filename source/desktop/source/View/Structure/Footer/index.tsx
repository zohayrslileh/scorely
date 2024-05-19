import themes from "@/View/Appearance/Themes"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container>
        {themes.map(theme => <button key={theme.key} onClick={() => Appearance.theme = theme} disabled={Appearance.theme === theme}>{theme.name}</button>)}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    border: 2px solid;
`