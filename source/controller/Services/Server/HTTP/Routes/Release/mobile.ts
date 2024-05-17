import { serveStatic } from "@hono/node-server/serve-static"

/*
|-----------------------------
| Mobile
|-----------------------------
|
|
*/
export default serveStatic({
    root: "dist/mobile/release",
    rewriteRequestPath: (path) => path.replace(/^\/release/, "/")
})