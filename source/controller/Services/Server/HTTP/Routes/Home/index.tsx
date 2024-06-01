import Download from "./Download"
import { Context } from "hono"

/*
|-----------------------------
| Home
|-----------------------------
|
|
*/
export default async function (context: Context) {

    return context.html(<Download />)
}