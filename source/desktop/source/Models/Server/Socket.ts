import Manager from "@/Tools/Socket/Manager"
import config from "@/config"

/*
|-----------------------------
|  Create manager
|-----------------------------
|
|
*/
const manager = new Manager(import.meta.env.DEV ? config.DEV_BASE_SERVER_URL : undefined)

export default manager