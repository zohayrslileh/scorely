import { stream } from "hono/streaming"
import { createReadStream } from "fs"
import { Context } from "hono"

/*
|-----------------------------
| Home
|-----------------------------
|
|
*/
export default async function (context: Context) {

    context.set("Content-Type", "video/webm")

    return stream(context, async function (stream) {

        const vedio = createReadStream("storage/record.webm")

        await new Promise<void>(function (resolve) {

            vedio.on("data", data => stream.write(data))

            vedio.on("end", resolve)
        })

    })
}