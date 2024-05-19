import Authorization from "@/Models/Authorization"
import Manager from "@/Tools/Socket/Manager"
import Server from "."

/*
|-----------------------------
|  Create manager
|-----------------------------
|
|
*/
const manager = new Manager(Server.value, { authorization: () => Authorization.value })

export default manager