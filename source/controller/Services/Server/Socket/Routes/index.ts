import Router from "@/Tools/Socket/Router"
import main from "./main"

/*
|-----------------------------
| Routes
|-----------------------------
|
*/
export default new Router(function (routes) {

    /**
     * Main
     * 
     */
    routes.route("/main", main)

})