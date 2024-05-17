import EventError from "@/Tools/Socket/EventError"
import ViewException from "."

/*
|-----------------------------
|  Ws Event Exception
|-----------------------------
|
|
*/
export default class WsEventException extends ViewException {

    /**
     * Event Error
     * 
     */
    public readonly eventError: EventError

    /**
     * Constructor method
     * 
     */
    constructor(eventError: EventError) {

        // Call parent constructor
        super(eventError.response.message)

        // Set event error
        this.eventError = eventError
    }
}