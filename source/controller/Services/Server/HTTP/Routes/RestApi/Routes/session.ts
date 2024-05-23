import HttpException from "@/Services/Server/HTTP/Exception/Exceptions"
import Authentication from "@/Core/Authentication"
import Router from "@/Tools/HTTP/Router"
import Session from "@/Core/Session"

/*
|-----------------------------
|  Session
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (session) {

    /**
     * Create
     * 
     */
    session.post(async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Create session
        const session = await Session.create()

        return context.json(session)
    })

    /**
     * Record
     * 
     */
    session.get(async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)
    
        // Get sessions
        const sessions = await Session.record()

        return context.json(sessions)
    })

    /**
     * Find
     * 
     */
    session.get("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get session
        const session = await Session.find(+context.req.param("id"))

        return context.json(session)
    })

    /**
     * Update
     * 
     */
    session.post("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get session
        const session = await Session.find(+context.req.param("id"))

        // Update
        await session.update()

        return context.json(session)
    })

    /**
     * Delete
     * 
     */
    session.delete("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get session
        const session = await Session.find(+context.req.param("id"))

        // Delete
        await session.delete()

        return context.json(undefined)
    })

})

/**
 * Environment
 * 
 */
interface Environment {

    // Variables
    Variables: {
        authentication: Authentication
    }
}