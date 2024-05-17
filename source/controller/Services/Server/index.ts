import { createServer, Server } from "http"
import { serve } from "@hono/node-server"
import Service from "@/Tools/Service"
import { bold, blue } from "chalk"
import Socket from "./Socket"
import HTTP from "./HTTP"

/*
|-----------------------------
|  Server Executor
|-----------------------------
|
|
*/
const executor = () => new Promise<string>(function (resolve) {

    /*
    |-----------------------------
    |  Create Server
    |-----------------------------
    |
    |
    */
    const server = serve({ createServer, fetch: HTTP().fetch })

    /*
    |-----------------------------
    |  Set Socket Server
    |-----------------------------
    |
    |
    */
    if (server instanceof Server) Socket(server)

    /*
    |-----------------------------
    |  Start Listen
    |-----------------------------
    |
    |
    */
    server.listen(process.env.PORT, () => resolve(`Listen to ${bold.yellow(process.env.PORT)} (${blue(`http://localhost:${process.env.PORT}`)})`))

})

/*
|-----------------------------
|  Server Service
|-----------------------------
|
|
*/
export default new Service("Server", executor)