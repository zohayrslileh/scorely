import ParticipantEntity from "@/Models/Database/Entities/Participant"
import CoreException from "./Exception"
import zod from "zod"

/*
|-----------------------------
|  Participant
|-----------------------------
|
| 
*/
export default class Participant {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Constructor method
     * 
     */
    public constructor(id: unknown) {

        // Schema
        const schema = zod.number()

        // Validate and set id
        this.id = schema.parse(id)
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(data: unknown) {

        // Schema
        const schema = zod.object({
            name: zod.string().max(50)
        })

        // Validate data
        const { name } = schema.parse(data)

        // Create entity
        const entity = new ParticipantEntity

        // Set name
        entity.name = name

        // Save
        await entity.save()

        return new this(entity.id)
    }

    /**
     * Entity method
     * 
     * @returns
     */
    public async entity() {

        // Get entity
        const entity = await ParticipantEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Participant was not found")

        return entity
    }

    /**
     * Delete method
     * 
     * @returns
     */
    public async delete() {

        // Get entity
        const entity = await this.entity()

        await entity.remove()
    }

}