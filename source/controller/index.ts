import "./alias" // Alias import support
import Console from "@/Tools/Console"
import Service from "@/Tools/Service"
import * as Models from "@/Models"

/*
|-----------------------------
|  Application
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
    |  Read Arguments
    |-----------------------------
    |
    */
    const { params } = new Console(process.argv)

    /*
    |-----------------------------
    |  Services Available
    |-----------------------------
    |
    */
    const services = params.length ? params : await Service.scan(__dirname, "Services")

    /*
    |-----------------------------
    |  Execute Services
    |-----------------------------
    |
    */
    for (const service of services) await Service.require(__dirname, "Services", service).execute()
}