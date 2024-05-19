import ParticipantModel from "@/Models/Database/Entities/Participant"
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
    private readonly id: number

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

        // Create participant
        const participant = new ParticipantModel

        // Set name
        participant.name = name

        // Save
        await participant.save()

        return new this(participant.id)
    }

}