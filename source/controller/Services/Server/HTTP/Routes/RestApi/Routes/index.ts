import Router from "@/Tools/HTTP/Router"
import participant from "./participant"
import welcome from "./welcome"
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
     * Welcome
     * 
     */
    routes.all("/", welcome)

    /**
     * Auth
     * 
     */
    routes.route("/auth", auth)

    /**
     * Participant
     * 
     */
    routes.route("/participant", participant)

    routes.options("/*", context => context.body("OK"))

})