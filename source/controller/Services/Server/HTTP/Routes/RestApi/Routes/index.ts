import Router from "@/Tools/HTTP/Router"
import participant from "./participant"
import welcome from "./welcome"
import session from "./session"
import judge from "./judge"
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

    /**
     * Judge
     * 
     */
    routes.route("/judge", judge)

    /**
     * Session
     * 
     */
    routes.route("/session", session)

    routes.options("/*", context => context.body("OK"))

})