import { Context } from "hono"

/*
|-----------------------------
|  Welcome
|-----------------------------
|
|
*/
export default function (context: Context) {

    return context.json({ message: "Welcome to the API interface 👋" })
}