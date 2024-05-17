import ExceptionHandler from "./Exception"
import Router from "@/Tools/HTTP/Router"
import initialize from "./initialize"
import Routes from "./Routes"

/*
|-----------------------------
|  Rest Api
|-----------------------------
|
|
*/
export default Router.create(function (restApi) {

    /*
    |-----------------------------
    |  Exception Handler
    |-----------------------------
    |
    |
    */
    restApi.onError(ExceptionHandler)

    /*
    |-----------------------------
    |  Initialize
    |-----------------------------
    |
    |
    */
    restApi.use("/*", initialize)

    /*
    |-----------------------------
    |  Routes
    |-----------------------------
    |
    |
    */
    restApi.route("/", Routes)

})