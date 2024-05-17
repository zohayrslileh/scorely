import type Router from "@/Tools/Console/Router"
import { DEV_MODE } from "@/Models/Config"

/*
|-----------------------------
|  Application control
|-----------------------------
|
|
*/
export default function (control: Router) {

    control.route("-v", () => require("./version"))
    control.route("sync", () => require("./sync"))

    if (!DEV_MODE) return // The rest for dev mode

    control.route("dev", () => require("./dev"))
    control.route("build", () => require("./build"))
    control.route("release", () => require("./release"))
}