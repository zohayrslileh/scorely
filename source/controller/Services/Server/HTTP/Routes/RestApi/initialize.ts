import Authentication from "@/Core/Authentication"
import { MiddlewareHandler } from "hono"

/*
|-----------------------------
|  Initialize Middleware
|-----------------------------
|
|
*/
const initialize: MiddlewareHandler = async function (context, next) {

    // Set Authentication
    context.set("authentication", new Authentication(context.req.header("Authorization")))

    return await next()
}

export default initialize