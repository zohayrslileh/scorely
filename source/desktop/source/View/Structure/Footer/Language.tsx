import languages from "@/View/Language/Languages"
import Language from "@/View/Language"

/**
 * Language
 * 
 * @returns 
 */
export default function () {

    return <select value={Language.value.key} onChange={event => Language.value = languages.find(language => language.key === event.target.value) || languages[0]}>
        {languages.map(language => <option key={language.key} value={language.key}>{language.name}</option>)}
    </select>
}