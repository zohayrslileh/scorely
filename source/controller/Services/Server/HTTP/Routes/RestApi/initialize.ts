import HttpException from "@/Services/Server/HTTP/Exception/Exceptions"
import Authentication from "@/Core/Authentication"
import app from "@/Models/Config/package"
import { MiddlewareHandler } from "hono"

/*
|-----------------------------
|  Initialize Middleware
|-----------------------------
|
|
*/
const initialize: MiddlewareHandler = async function (context, next) {

    // Get version
    const version = context.req.header("Version")

    // Get authorization
    const authorization = context.req.header("Authorization")

    // Check version compatibility
    if (version && version !== app.version) throw new HttpException("There is no compatibility")

    // Set Authentication
    context.set("authentication", new Authentication(authorization))

    return await next()
}

export default initialize