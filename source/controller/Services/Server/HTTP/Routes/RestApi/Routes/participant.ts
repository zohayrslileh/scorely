import HttpException from "@/Services/Server/HTTP/Exception/Exceptions"
import Authentication from "@/Core/Authentication"
import Participant from "@/Core/Participant"
import Router from "@/Tools/HTTP/Router"

/*
|-----------------------------
|  Participant
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (participant) {

    /**
     * Create
     * 
     */
    participant.post(async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Create participant
        const participant = await Participant.create(await context.req.json())

        return context.json(participant)
    })

    /**
     * Record
     * 
     */
    participant.get(async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)
    
        // Get participants
        const participants = await Participant.record(context.req.query())

        return context.json(participants)
    })

    /**
     * Find
     * 
     */
    participant.get("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get participant
        const participant = await Participant.find(+context.req.param("id"))

        return context.json(participant)
    })

    /**
     * Update
     * 
     */
    participant.post("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get participant
        const participant = await Participant.find(+context.req.param("id"))

        // Update
        await participant.update(await context.req.json())

        return context.json(participant)
    })

    /**
     * Delete
     * 
     */
    participant.delete("/:id", async function (context) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Check role
        if (!await user.hasRole("admin")) throw new HttpException("You do not have permission to perform this operation", 401)

        // Get participant
        const participant = await Participant.find(+context.req.param("id"))

        // Delete
        await participant.delete()

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