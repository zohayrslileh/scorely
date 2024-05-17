import UnprocessableEntity from "./Exceptions/UnprocessableEntity"
import UnauthorizedException from "@/Core/Exception/Unauthorized"
import CoreException from "@/Core/Exception"
import { DEV_MODE } from "@/Models/Config"
import HttpException from "./Exceptions"
import { ZodError } from "zod"

/**
 * Compiler method
 * 
 * @returns 
 */
export default function (exception: unknown): HttpException {

    /**
     * Http Exception
     * 
     */
    if (exception instanceof HttpException) return exception

    /**
     * Unauthorized Exception
     * 
     */
    if (exception instanceof UnauthorizedException) return new HttpException(exception.message, 401)

    /**
     * Core Exception
     * 
     */
    if (exception instanceof CoreException) return new HttpException(exception.message)

    /**
     * Zod Error
     * 
     */
    if (exception instanceof ZodError) return new UnprocessableEntity(exception.issues)

    /**
     * Error
     * 
     */
    if (exception instanceof Error) return new HttpException(DEV_MODE ? exception.message : "Interal Error", 500)

    /**
     * Unknow Exception
     * 
     */
    return new HttpException(DEV_MODE ? "Unknow Exception" : "Interal Error", 500)

}