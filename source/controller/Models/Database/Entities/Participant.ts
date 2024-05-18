import BaseEntity from "@/Tools/Database/Entity"
import { Entity, Column } from "typeorm"

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

}