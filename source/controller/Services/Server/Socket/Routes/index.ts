import Router from "@/Tools/Socket/Router"
import session from "./session"

/*
|-----------------------------
| Routes
|-----------------------------
|
*/
export default new Router(function (routes) {

    /**
     * Session
     * 
     */
    routes.route("/session", session)

})