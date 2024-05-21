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

    // Set Access-Control-Allow-Origin
    context.header("Access-Control-Allow-Origin", "*")

    // Set Access-Control-Allow-Headers
    context.header("Access-Control-Allow-Headers", "*")

    // Set Access-Control-Allow-Methods
    context.header("Access-Control-Allow-Methods", "*")

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