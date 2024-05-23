import languages from "@/View/Language/Languages"
import Select from "@/View/Components/Select"
import Language from "@/View/Language"

/**
 * Language
 * 
 * @returns 
 */
export default function () {

    return <Select value={Language.value.key} onChange={event => Language.value = languages.find(language => language.key === event.target.value) || languages[0]}>
        {languages.map(language => <option key={language.key} value={language.key}>{language.name}</option>)}
    </Select>
}