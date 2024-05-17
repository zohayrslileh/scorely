import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Permission from "./Permission"
import User from "./User"

/*
|-----------------------------
|  Role model
|-----------------------------
|
| 
*/
@Entity()
export default class Role extends BaseEntity {

    /**
     * Name
     * 
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    declare public name: string

    /**
     * Users
     * 
     */
    @OneToMany(() => User, user => user.role)
    declare public users: User[]

    /**
     * Permissions
     * 
     */
    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable()
    declare public permissions: Permission[]

    /**
     * Has permission method
     * 
     * @returns
     */
    public async hasPermission(name: string) {

        return !!await Permission.findOneBy({ roles: [{ id: this.id }], name })
    }

}