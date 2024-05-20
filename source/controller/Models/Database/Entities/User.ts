import { Entity, Column, ManyToOne, OneToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import { Signer } from "@/Models/Encryptor"
import bcrypt from "bcrypt"
import Judge from "./Judge"
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
     * Judge
     * 
     */
    @OneToOne(() => Judge, judge => judge.user)
    declare public judge: Judge | null

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
     * Get role method
     * 
     * @returns
     */
    public async getRole() {

        return await Role.findOneBy({ users: [{ id: this.id }] })
    }

    /**
     * Get judge method
     * 
     * @returns
     */
    public async getJudge() {

        return await Judge.findOneBy({ user: { id: this.id } })
    }

    /**
     * Has role method
     * 
     * @returns
     */
    public async hasRole(name: string) {

        // Get role
        const role = await this.getRole()

        return role && role.name === name
    }

    /**
     * Has permission method
     * 
     * @returns
     */
    public async hasPermission(name: string) {

        // Get role
        const role = await this.getRole()

        return !!role && await role.hasPermission(name)
    }

}