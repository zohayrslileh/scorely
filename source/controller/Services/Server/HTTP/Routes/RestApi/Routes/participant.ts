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
     * Permission middleware
     * 
     */
    participant.all(async function (context, next) {

        // Authentication verify
        const user = await context.var.authentication.verify()

        // Role
        const role = await user.getRole()

        // Check role
        if (!role || role.name !== "adminx") throw new HttpException("You do not have permission to perform this operation", 401)

        return await next()
    })

    /**
     * Create
     * 
     */
    participant.post(async function (context) {

        // Create participant
        const participant = await Participant.create(await context.req.json())

        return context.json(participant)
    })

    /**
     * Read
     * 
     */
    participant.get("/:id", async function (context) {

        // Get participant
        const participant = new Participant(+context.req.param("id"))

        return context.json(await participant.read())
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