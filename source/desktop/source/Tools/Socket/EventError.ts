
/*
|-----------------------------
|  Event Error
|-----------------------------
|
|
*/
export default class EventError extends Error {

    /**
     * Code
     * 
     */
    public readonly code: string

    /**
     * Response
     * 
     */
    public readonly response: unknown

    /**
     * Constructor method
     * 
     */
    public constructor(response: unknown, code: string) {

        // Call parent constructor
        super("Event has rejected by code: " + code)

        // Set response
        this.response = response

        // Set code
        this.code = code
    }
}