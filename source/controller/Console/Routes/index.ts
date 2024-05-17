import Router from "@/Tools/Console/Router"
import control from "./control"

/*
|-----------------------------
| Routes
|-----------------------------
|
|
*/
export default Router.create(function (routes) {

    control(routes) // Application control
    routes.route("test", () => require("./tester"))
})