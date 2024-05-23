import HttpException from "@/Services/Server/HTTP/Exception/Exceptions"
import Authentication from "@/Core/Authentication"
import Router from "@/Tools/HTTP/Router"
import Judge from "@/Core/Judge"

/*
|-----------------------------
|  Judge
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (judge) {

    /**
     * Create
     * 
     */
    judge.post(async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Create judge
        const judge = await Judge.create(await context.req.json())

        return context.json(judge)
    })

    /**
     * Record
     * 
     */
    judge.get(async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get judges
        const judges = await Judge.record(context.req.query())

        return context.json(judges)
    })

    /**
     * Find
     * 
     */
    judge.get("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get judge
        const judge = await Judge.find(+context.req.param("id"))

        return context.json(judge)
    })

    /**
     * Update
     * 
     */
    judge.post("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get judge
        const judge = await Judge.find(+context.req.param("id"))

        // Update
        await judge.update(await context.req.json())

        return context.json(judge)
    })

    /**
     * Delete
     * 
     */
    judge.delete("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get judge
        const judge = await Judge.find(+context.req.param("id"))

        // Delete
        await judge.delete()

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