import { ExceptionHandler } from "@/Tools/Socket/Client"
import compiler from "./compiler"

/*
|-----------------------------
|  Exception Handler
|-----------------------------
|
|
*/
const ExceptionHandler: ExceptionHandler = function (client, exception, reject) {

    /**
     * Ws Exception
     * 
     */
    const wsException = compiler(exception)

    /**
     * Reject
     * 
     */
    if (reject) reject(wsException.toJSON(), wsException.code)

    /**
     * Emit
     * 
     */
    else client.socket.emit("error", wsException.message)
}

export default ExceptionHandler