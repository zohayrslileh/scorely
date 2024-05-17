import { MiddlewareHandler } from "hono"

/*
|-----------------------------
|  Initialize Middleware
|-----------------------------
|
|
*/
const initialize: MiddlewareHandler = async function (context, next) {

    // Set Headers
    context.header("X-Powered-By", "Xaelion")
    context.header("Access-Control-Allow-Origin", "*")
    context.header("Access-Control-Allow-Headers", "*")

    return await next()
}

export default initialize