import BaseEntity from "@/Tools/Database/Entity"
import { Entity, ManyToMany } from "typeorm"
import Participant from "./Participant"
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
    
}