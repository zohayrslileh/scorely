
/*
|-----------------------------
|  Languages
|-----------------------------
|
|
*/
const languages = [
    {
        name: "Français",
        key: "fr-FR",
        direction: "ltr",
        dictionary: async () => await import("./fr-FR")
    },
    {
        name: "العربية",
        key: "ar-MA",
        direction: "rtl",
        dictionary: async () => await import("./ar-MA")
    }
]

export default languages