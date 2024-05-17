import { ErrorHandler } from "hono"
import compiler from "./compiler"

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

    return context.html(<b>{httpException.message}</b>, httpException.status)
}

export default ExceptionHandler