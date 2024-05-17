import Preferences from "@/Models/Preferences"
import usePromise from "@/Tools/Promise"
import languages from "./Languages"
import State from "@/Tools/State"

/*
|-----------------------------
|  Language State
|-----------------------------
|
|
*/
export default class LanguageState extends State<typeof initialLanguage> {

    /**
     * Get value
     * 
     * @returns
     */
    public get value() {

        return super.value
    }

    /**
     * Set value
     * 
     * @returns
     */
    public set value(language: typeof initialLanguage) {

        // Set value
        super.value = language

        // Update preferences
        Preferences.update.language(language.key)
    }

    /**
     * Provider hook
     * 
     * @returns
     */
    public useProvider() {

        /**
         * State copy
         * 
         */
        return this.useCopy()
    }

    /**
     * Dictionary hook
     * 
     * @returns 
     */
    public useDictionary() {

        /**
         * Dictionary
         * 
         */
        return usePromise(async () => {

            // Get module
            const module = await this.value.dictionary()

            return module.default

        }, [this.value])
    }
}

/**
 * Initial Language
 * 
 */
export const initialLanguage = languages.find(language => language.key === Preferences.value.language) || languages[0]