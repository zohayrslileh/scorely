import Router from "@/Tools/HTTP/Router"
import desktop from "./desktop"
import mobile from "./mobile"

/*
|-----------------------------
| Release
|-----------------------------
|
|
*/
export default Router.create(function (release) {

    release.get("/*", desktop, mobile)
})
