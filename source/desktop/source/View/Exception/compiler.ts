import WsEventException from "./Exceptions/WsEvent"
import EventError from "@/Tools/Socket/EventError"
import ViewException from "./Exceptions"

/**
 * Compiler method
 * 
 * @returns 
 */
export default function (exception: unknown): ViewException {

    /**
     * View Exception
     * 
     */
    if (exception instanceof ViewException) return exception

    /**
     * Event Error
     * 
     */
    if (exception instanceof EventError) return new WsEventException(exception)

    /**
     * Error Exception
     * 
     */
    if (exception instanceof Error) return new ViewException(exception.message)

    /**
     * Unknow Exception
     * 
     */
    return new ViewException("Unknow Exception")

}