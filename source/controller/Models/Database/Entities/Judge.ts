import { Entity, Column, ManyToMany, JoinTable } from "typeorm"
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
    @JoinTable()
    declare public sessions: Session[]
}