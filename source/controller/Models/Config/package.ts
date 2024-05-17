import Json from "@/Tools/Json"

/*
|-----------------------------
|  Package config
|-----------------------------
|
|
*/
const app = new Json<Package>("./package.json").value

/*
|-----------------------------
|  Package
|-----------------------------
|
|
*/
export interface Package {
    name: string
    version: string
    main: string
    author: string
    license: string
    engines: Record<string, string>
    scripts?: Record<string, string>
    proScripts?: Record<string, string>
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
}

export default app