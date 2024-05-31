import schema from "@/View/Appearance/schema"
import Color from "@/Tools/Color"

/*
|-----------------------------
|  Dark Theme
|-----------------------------
|
|
*/
export default {

    BACKGROUND_SECONDARY: new Color("#192130"),
    BACKGROUND_PRIMARY: schema.COLOR_DARK,
    CONTENT_COLOR: schema.COLOR_LIGHT,
    FORCE_COLOR: schema.COLOR_GREEN,
    BACKGROUND_GRADIENT: "linear-gradient(90deg, rgba(11,19,32,1) 0%, rgba(11,13,42,1) 100%)"
}