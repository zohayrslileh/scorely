import app from "@/Models/Config/package"
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
    routes.all("/", context => context.json(app))

    /**
     * Auth
     * 
     */
    routes.route("/auth", auth)

    routes.options("/*", context => context.body("OK"))

})