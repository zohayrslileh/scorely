import { Entity, Column, ManyToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Participant from "./Participant"
import Session from "./Session"
import Judge from "./Judge"

/*
|-----------------------------
|  Rating model
|-----------------------------
|
| 
*/
@Entity()
export default class Rating extends BaseEntity {

    /**
     * Value
     * 
     */
    @Column({ type: "number", nullable: false })
    declare public value: number

    /**
     * Session
     * 
     */
    @ManyToOne(() => Session, session => session.ratings)
    declare public session: Session

    /**
     * Judge
     * 
     */
    @ManyToOne(() => Judge, judge => judge.ratings)
    declare public judge: Judge

    /**
     * Participant
     * 
     */
    @ManyToOne(() => Participant, participant => participant.ratings)
    declare public participant: Participant

}