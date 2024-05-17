import { Server as BaseServer } from "socket.io"
import Router from "./Router"

/*
|-----------------------------
|  Server
|-----------------------------
| 
|
*/
export default class Server extends BaseServer {

    /**
     * Route method
     * 
     * @returns
     */
    public async route(router: Router) {

        router.execute(this)
    }
}