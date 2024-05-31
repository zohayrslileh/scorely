import { Entity, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Session from "./Session"
import Rating from "./Rating"
import User from "./User"

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
     * Primary
     * 
     */
    @Column({ type: "boolean", nullable: false, default: false })
    declare public primary: boolean

    /**
     * Sessions
     * 
     */
    @ManyToMany(() => Session, session => session.judges)
    @JoinTable()
    declare public sessions: Session[]

    /**
     * User
     * 
     */
    @OneToOne(() => User, user => user.judge, { nullable: false })
    @JoinColumn()
    declare public user: User

    /**
     * Ratings
     * 
     */
    @OneToMany(() => Rating, rating => rating.judge)
    declare public ratings: Rating[]

}