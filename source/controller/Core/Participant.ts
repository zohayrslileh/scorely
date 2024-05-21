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
     * Entity method
     * 
     * @returns
     */
    public async entity() {

        // Get Participant
        const participant = await ParticipantEntity.findOneBy({ id: this.id })

        // Check Participant
        if (!participant) throw new CoreException("Participant was not found")

        return participant
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

        // Create participant
        const participant = new ParticipantEntity

        // Set name
        participant.name = name

        // Save
        await participant.save()

        return new this(participant.id)
    }

}