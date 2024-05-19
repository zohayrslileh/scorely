import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Session from "./Session"
import Rating from "./Rating"

/*
|-----------------------------
|  Participant model
|-----------------------------
|
| 
*/
@Entity()
export default class Participant extends BaseEntity {

    /**
     * Name
     * 
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    declare public name: string

    /**
     * Sessions
     * 
     */
    @ManyToMany(() => Session, session => session.participants)
    @JoinTable()
    declare public sessions: Session[]

    /**
     * Ratings
     * 
     */
    @OneToMany(() => Rating, rating => rating.participant)
    declare public ratings: Rating[]

}