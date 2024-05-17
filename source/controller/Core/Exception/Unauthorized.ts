import CoreException from "."

/*
|-----------------------------
|  Unauthorized Exception
|-----------------------------
|
|
*/
export default class UnauthorizedException extends CoreException {

    /**
     * Constructor method
     * 
     */
    public constructor(message: string = "Unauthorized") {

        // Call parent constructor
        super(message)
    }
}