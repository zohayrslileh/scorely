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

        // Message
        const message = (
            eventError.response
            && typeof eventError.response === "object"
            && "message" in eventError.response
            && typeof eventError.response.message === "string"
        ) ? eventError.response.message : eventError.message

        // Call parent constructor
        super(message)

        // Set event error
        this.eventError = eventError
    }
}