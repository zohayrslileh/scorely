import { Entity, Column, ManyToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import { Signer } from "@/Models/Encryptor"
import bcrypt from "bcrypt"
import Role from "./Role"

/*
|-----------------------------
|  User model
|-----------------------------
|
| 
*/
@Entity()
export default class User extends BaseEntity {

    /**
     * Username
     * 
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    declare public username: string

    /**
     * Password
     * 
     */
    @Column({ type: "text", nullable: false })
    declare private password: string

    /**
     * Role
     * 
     */
    @ManyToOne(() => Role, role => role.users)
    declare public role: Role | null

    /**
     * Set password method
     * 
     * @returns
     */
    public async setPassword(password: string): Promise<void> {

        this.password = await bcrypt.hash(password, 10)
    }

    /**
     * Verify password method
     * 
     * @returns
     */
    public async verifyPassword(password: string): Promise<boolean> {

        return await bcrypt.compare(password, this.password)
    }

    /**
     * Create token method
     * 
     * @returns
     */
    public createToken(): string {

        return Signer.sign({ id: this.id })
    }

    /**
     * Find by token method
     * 
     * @returns
     */
    public static async findByToken(token: string) {

        // Verify token
        const payload = Signer.verify<{ id: number }>(token)

        return await User.findOneBy({ id: payload.id })
    }

    /**
     * Has permission method
     * 
     * @returns
     */
    public async hasPermission(name: string) {

        // Get role
        const role = await Role.findOneBy({ users: [{ id: this.id }] })

        return !!role && await role.hasPermission(name)
    }

}