import Router from "@/Tools/HTTP/Router"
import Release from "./Release"
import RestApi from "./RestApi"
import Home from "./Home"

/*
|-----------------------------
| Routes
|-----------------------------
|
|
*/
export default Router.create(function (routes) {

    /**
     * Home
     * 
     */
    routes.get("/", Home)

    /**
     * Rest Api
     * 
     */
    routes.route("/api", RestApi)

    /**
     * Release
     * 
     */
    routes.route("/release", Release)

})