import Router from "@/Tools/Console/Router"

/*
|-----------------------------
| Build
|-----------------------------
|
|
*/
export default Router.create(function (build) {

    build.index(() => require("./all"))
    build.route("mobile", () => require("./mobile"))
    build.route("desktop", () => require("./desktop"))
    build.route("controller", () => require("./controller"))
})