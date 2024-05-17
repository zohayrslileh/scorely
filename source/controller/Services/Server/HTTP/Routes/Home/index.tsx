import Download from "./Download"
import { Context } from "hono"

/*
|-----------------------------
| Home
|-----------------------------
|
|
*/
export default function (client: Context) {

    return client.html(<Download />)
}