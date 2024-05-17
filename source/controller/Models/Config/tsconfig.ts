import Json from "@/Tools/Json"

/*
|-----------------------------
|  Tsconfig config
|-----------------------------
|
|
*/
export default new Json<Tsconfig>("./tsconfig.json").value

/*
|-----------------------------
|  Tsconfig
|-----------------------------
|
|
*/
export interface Tsconfig {
    compilerOptions: {
        target: string
        module: string
        allowJs: boolean
        strict: boolean
        noImplicitAny: boolean
        esModuleInterop: boolean
        moduleResolution: string
        resolveJsonModule: boolean
        outDir: string
        baseUrl: string
        paths: Record<string, string[]>
    };
    exclude: string[]
    include: string[]
}