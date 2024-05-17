import { serveStatic } from "@hono/node-server/serve-static"

/*
|-----------------------------
| Desktop
|-----------------------------
|
|
*/
export default serveStatic({
    root: "dist/desktop/release",
    rewriteRequestPath: (path) => path.replace(/^\/release/, "/")
})