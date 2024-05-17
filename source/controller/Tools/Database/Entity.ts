import { BaseEntity as DefaultBaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

/*
|-----------------------------
|  Base Entity
|-----------------------------
| 
|
*/
export default class BaseEntity extends DefaultBaseEntity {

    /**
     * Id
     * 
     */
    @PrimaryGeneratedColumn()
    declare public readonly id: number

    /**
     * Created at
     * 
     */
    @CreateDateColumn()
    declare public readonly createdAt: Date

    /**
     * Updated at
     * 
     */
    @UpdateDateColumn()
    declare public readonly updatedAt: Date

}