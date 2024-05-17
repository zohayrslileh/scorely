import Json from "@/Tools/Json"

/*
|-----------------------------
|  Xaelion config
|-----------------------------
|
|
*/
export default new Json<Xaelion>("./xaelion.json").value

/*
|-----------------------------
|  Xaelion
|-----------------------------
|
|
*/
export interface Xaelion {
    devPaths: string[]
    localPaths: string[]
    renewablePaths: string[]
}