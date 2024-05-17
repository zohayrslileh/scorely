import { StatusCode } from "hono/utils/http-status"

/*
|-----------------------------
|  Http Exception
|-----------------------------
|
|
*/
export default class HttpException extends Error {

    /**
     * Status
     * 
     */
    public readonly status: StatusCode

    /**
     * Constructor method
     * 
     */
    public constructor(message: string, status: StatusCode = 400) {

        // Call parent constructor
        super(message)

        // Set status
        this.status = status
    }

    /**
     * To JSON method
     * 
     * @returns
     */
    public toJSON() {

        return { status: this.status, message: this.message }
    }

}