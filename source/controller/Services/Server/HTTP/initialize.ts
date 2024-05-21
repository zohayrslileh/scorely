import { MiddlewareHandler } from "hono"

/*
|-----------------------------
|  Initialize Middleware
|-----------------------------
|
|
*/
const initialize: MiddlewareHandler = async function (context, next) {

    // Set X Powered By
    context.header("X-Powered-By", "Xaelion")

    return await next()
}

export default initialize