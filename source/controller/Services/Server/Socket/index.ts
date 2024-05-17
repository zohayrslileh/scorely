import { type Server as HttpServer } from "http"
import ExceptionHandler from "./Exception"
import Server from "@/Tools/Socket"
import Routes from "./Routes"

/*
|-----------------------------
| Socket Server
|-----------------------------
|
|
*/
export default function (httpServer: HttpServer): void {

    /*
    |-----------------------------
    |  Create Server
    |-----------------------------
    |
    |
    */
    const server = new Server(httpServer, { cors: { origin: "*" } })

    /*
    |-----------------------------
    |  Exception Handler
    |-----------------------------
    |
    |
    */
    Routes.onException(ExceptionHandler)

    /*
    |-----------------------------
    |  Routes
    |-----------------------------
    |
    |
    */
    server.route(Routes)
}