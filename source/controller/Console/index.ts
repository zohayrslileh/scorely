import "../alias" // Alias import support
import Console from "@/Tools/Console"
import * as Models from "@/Models"
import Routes from "./Routes"

/*
|-----------------------------
|  Command Line Application
|-----------------------------
|
|
*/
module.exports = async function () {

    /*
    |-----------------------------
    |  Initialize Models
    |-----------------------------
    |
    */
    await Models.initialize()

    /*
    |-----------------------------
    |  Create Application
    |-----------------------------
    |
    */
    const application = new Console(process.argv)

    /*
    |-----------------------------
    |  Execute Application
    |-----------------------------
    |
    */
    await application.execute(Routes)
}