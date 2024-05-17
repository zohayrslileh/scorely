import { ZodIssue } from "zod"
import WsException from "."

/*
|-----------------------------
|  Unprocessable Entity
|-----------------------------
|
|
*/
export default class UnprocessableEntity extends WsException {

    /**
     * Issues
     * 
     */
    public readonly issues: ZodIssue[]

    /**
     * Constructor method
     * 
     */
    public constructor(issues: ZodIssue[]) {

        // Call parent constructor
        super(issues[0].message, "UNPROCESSABLE_ENTITY")

        // Set issues
        this.issues = issues
    }

    /**
     * To JSON method
     * 
     * @returns
     */
    public toJSON() {

        return { code: this.code, message: this.message, issues: this.issues }
    }

}