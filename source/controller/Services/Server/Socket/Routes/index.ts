import Router from "@/Tools/Socket/Router"
import stream from "./stream"
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

    /**
     * Stream
     * 
     */
    routes.route("/stream", stream)

})