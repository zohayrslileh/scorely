import screenshotDesktop from "screenshot-desktop"
import Router from "@/Tools/Socket/Router"

/*
|-----------------------------
| Stream
|-----------------------------
|
*/
export default new Router(async function (stream) {

    do {

        const screenshot = await screenshotDesktop()

        stream.namespace.emit("screenshot", screenshot.toString("base64"))

    } while (true)
})