import { ZodIssue } from "zod"
import HttpException from "."

/*
|-----------------------------
|  Unprocessable Entity
|-----------------------------
|
|
*/
export default class UnprocessableEntity extends HttpException {

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
        super(issues[0].message, 422)

        // Set issues
        this.issues = issues
    }

    /**
     * To JSON method
     * 
     * @returns
     */
    public toJSON() {

        return { status: this.status, message: this.message, issues: this.issues }
    }

}