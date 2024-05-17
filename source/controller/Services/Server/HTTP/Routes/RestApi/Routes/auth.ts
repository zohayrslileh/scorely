import Authentication from "@/Core/Authentication"
import Router from "@/Tools/HTTP/Router"

/*
|-----------------------------
|  Auth
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (auth) {

    /**
     * Verify
     * 
     */
    auth.post(async function (context) {

        return context.json(await context.var.authentication.verify())
    })

    /**
     * Login
     * 
     */
    auth.post("/login", async function (context) {

        // Login
        const token = await context.var.authentication.login(await context.req.json())

        return context.json({ token })
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