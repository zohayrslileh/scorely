import Router from "@/Tools/HTTP/Router"
import auth from "./auth"

/*
|-----------------------------
|  Routes
|-----------------------------
|
|
*/
export default Router.create(function (routes) {

    /**
     * Main
     * 
     */
    routes.all("/", context => context.json({ message: "Welcome to the API interface 👋" }))

    /**
     * Auth
     * 
     */
    routes.route("/auth", auth)

    routes.options("/*", context => context.body("OK"))

})