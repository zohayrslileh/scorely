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
     * Score
     * 
     */
    @Column({ type: "float", nullable: false })
    declare public score: number

    /**
     * Penalties
     * 
     */
    @Column({ type: "float", nullable: true })
    declare public penalties: number | null

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