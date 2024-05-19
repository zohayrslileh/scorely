import Authentication from "@/Core/Authentication"
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

        return context.json(user)
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