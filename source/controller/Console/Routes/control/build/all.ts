import controller from "./controller"
import desktop from "./desktop"
import mobile from "./mobile"

/*
|-----------------------------
| Build All
|-----------------------------
|
|
*/
export default async function () {

    await controller()

    await desktop()

    await mobile()
}