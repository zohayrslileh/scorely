import { Entity, Column, ManyToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Role from "./Role"

/*
|-----------------------------
|  Permission model
|-----------------------------
|
| 
*/
@Entity()
export default class Permission extends BaseEntity {

    /**
     * Name
     * 
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    declare public name: string

    /**
     * Roles
     * 
     */
    @ManyToMany(() => Role, role => role.permissions)
    declare public roles: Role[]
    
}