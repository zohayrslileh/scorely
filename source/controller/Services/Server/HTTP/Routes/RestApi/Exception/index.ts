import compiler from "@/Services/Server/HTTP/Exception/compiler"
import { ErrorHandler } from "hono"

/*
|-----------------------------
|  Exception Handler
|-----------------------------
|
|
*/
const ExceptionHandler: ErrorHandler = function (exception, context) {

    /**
     * Http Exception
     * 
     */
    const httpException = compiler(exception)

    return context.json(httpException.toJSON(), httpException.status)
}

export default ExceptionHandler