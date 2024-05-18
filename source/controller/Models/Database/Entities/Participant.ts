import { Entity, Column, ManyToMany, JoinTable } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Session from "./Session"

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
}