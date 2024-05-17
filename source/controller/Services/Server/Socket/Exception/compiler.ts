import UnprocessableEntity from "./Exceptions/UnprocessableEntity"
import UnauthorizedException from "@/Core/Exception/Unauthorized"
import CoreException from "@/Core/Exception"
import { DEV_MODE } from "@/Models/Config"
import WsException from "./Exceptions"
import { ZodError } from "zod"

/**
 * Compiler method
 * 
 * @returns 
 */
export default function (exception: unknown): WsException {

    /**
     * Ws Exception
     * 
     */
    if (exception instanceof WsException) return exception

    /**
     * Unauthorized Exception
     * 
     */
    if (exception instanceof UnauthorizedException) return new WsException(exception.message, "UNAUTHORIZED")

    /**
     * Core Exception
     * 
     */
    if (exception instanceof CoreException) return new WsException(exception.message)

    /**
     * Zod Error
     * 
     */
    if (exception instanceof ZodError) return new UnprocessableEntity(exception.issues)

    /**
     * Error
     * 
     */
    if (exception instanceof Error) return new WsException(DEV_MODE ? exception.message : "Interal Error", "INTERAL_ERROR")

    /**
     * Unknow Exception
     * 
     */
    return new WsException(DEV_MODE ? "Unknow Exception" : "Interal Error", "INTERAL_ERROR")

}