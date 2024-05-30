import { PrimitiveParticipant } from "./Participant"
import { PrimitiveSession } from "./Session"
import { PrimitiveJudge } from "./Judge"

/**
 * Primitive
 * 
 */
export interface PrimitiveOrder {
    judge: PrimitiveJudge
    session: PrimitiveSession
    participant: PrimitiveParticipant
}