import { Entity, Column, ManyToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Session from "./Session"

/*
|-----------------------------
|  Judge model
|-----------------------------
|
| 
*/
@Entity()
export default class Judge extends BaseEntity {

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
    @ManyToMany(() => Session, session => session.judges)
    declare public sessions: Session[]
}