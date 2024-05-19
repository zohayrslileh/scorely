import { Entity, ManyToMany, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Participant from "./Participant"
import Rating from "./Rating"
import Judge from "./Judge"

/*
|-----------------------------
|  Session model
|-----------------------------
|
| 
*/
@Entity()
export default class Session extends BaseEntity {

    /**
     * Judges
     * 
     */
    @ManyToMany(() => Judge, judge => judge.sessions)
    declare public judges: Judge[]

    /**
     * Participants
     * 
     */
    @ManyToMany(() => Participant, participant => participant.sessions)
    declare public participants: Participant[]

    /**
     * Ratings
     * 
     */
    @OneToMany(() => Rating, rating => rating.session)
    declare public ratings: Rating[]

}