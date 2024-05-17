import ExceptionHandler from "./Exception"
import initialize from "./initialize"
import Routes from "./Routes"
import { Hono } from "hono"

/*
|-----------------------------
| HTTP Server
|-----------------------------
|
|
*/
export default function (): Hono {

    /*
    |-----------------------------
    |  Create Application
    |-----------------------------
    |
    |
    */
    const application = new Hono()

    /*
    |-----------------------------
    |  Exception Handler
    |-----------------------------
    |
    |
    */
    application.onError(ExceptionHandler)

    /*
    |-----------------------------
    |  Initialize
    |-----------------------------
    |
    |
    */
    application.use("/*", initialize)

    /*
    |-----------------------------
    |  Routes
    |-----------------------------
    |
    |
    */
    application.route("/", Routes)

    return application
}