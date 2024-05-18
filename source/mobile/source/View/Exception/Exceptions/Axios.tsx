import { AxiosError } from "axios"
import ViewException from "."

/*
|-----------------------------
|  Axios Exception
|-----------------------------
|
|
*/
export default class AxiosException extends ViewException {

    /**
     * Axios Error
     * 
     */
    public readonly axiosError: AxiosError

    /**
     * Constructor method
     * 
     */
    constructor(axiosError: AxiosError) {

        // Message
        const message = (
            axiosError.response
            && axiosError.response
            && typeof axiosError.response.data === "object"
            && axiosError.response.data !== null
            && "message" in axiosError.response.data
            && typeof axiosError.response.data.message === "string"
        ) ? axiosError.response.data.message : axiosError.message

        // Call parent constructor
        super(message)

        // Set axios error
        this.axiosError = axiosError
    }
}