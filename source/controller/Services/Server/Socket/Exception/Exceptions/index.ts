
/*
|-----------------------------
|  Ws Exception
|-----------------------------
|
|
*/
export default class WsException extends Error {

    /**
     * Code
     * 
     */
    public readonly code: string

    /**
     * Constructor method
     * 
     */
    public constructor(message: string, code: string = "BAD_EVENT") {

        // Call parent constructor
        super(message)

        // Set code
        this.code = code
    }

    /**
     * To JSON method
     * 
     * @returns
     */
    public toJSON() {

        return { code: this.code, message: this.message }
    }
}