import Router from "@/Tools/Socket/Router"
import meet from "./meet"

/*
|-----------------------------
| Routes
|-----------------------------
|
*/
export default new Router(function (routes) {

    /**
     * Meet
     * 
     */
    routes.route("/meet", meet)

})