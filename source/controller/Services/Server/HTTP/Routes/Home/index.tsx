import Terminal from "@/Tools/Console/Terminal"
import { stream } from "hono/streaming"
import { createReadStream } from "fs"
import { Context } from "hono"

const terminal = new Terminal

terminal.execute("ffmpeg -y -r 15 -f gdigrab -i desktop -pix_fmt yuv420p storage/output.mp4")

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