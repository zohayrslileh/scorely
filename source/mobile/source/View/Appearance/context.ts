import Preferences from "@/Models/Preferences"
import State from "@/Tools/State"
import themes from "./Themes"

/*
|-----------------------------
|  Appearance State
|-----------------------------
|
|
*/
export default class AppearanceState extends State<typeof initialAppearance> {

    /**
     * Get theme
     * 
     * @returns
     */
    public get theme() {

        return this.value.theme
    }

    /**
     * Set theme
     * 
     * @returns
     */
    public set theme(theme: typeof initialAppearance.theme) {

        // Update theme
        this.update.theme(theme)

        // Update preferences
        Preferences.update.theme(theme.key)
    }

    /**
     * Get zoom
     * 
     * @returns
     */
    public get zoom() {

        return this.value.zoom
    }

    /**
     * Set zoom
     * 
     * @returns
     */
    public set zoom(zoom: number) {

        // Update zoom
        this.update.zoom(zoom)

        // Update preferences
        Preferences.update.zoom(zoom)
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
}

/**
 * Theme
 * 
 */
const theme = themes.find(theme => theme.key === Preferences.value.theme) || themes[0]

/**
 * Zoom
 * 
 */
const zoom = Preferences.value.zoom

/**
 * Initial Appearance
 * 
 */
export const initialAppearance = { theme, zoom }