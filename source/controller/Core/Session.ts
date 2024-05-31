import ParticipantEntity from "@/Models/Database/Entities/Participant"
import SessionEntity from "@/Models/Database/Entities/Session"
import RatingEntity from "@/Models/Database/Entities/Rating"
import JudgeEntity from "@/Models/Database/Entities/Judge"
import CoreException from "./Exception"
import Participant from "./Participant"
import Judge from "./Judge"
import zod from "zod"

/*
|-----------------------------
|  Session
|-----------------------------
|
| 
*/
export default class Session {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Constructor method
     * 
     */
    private constructor(primitiveSession: PrimitiveSession) {

        // Set id
        this.id = primitiveSession.id
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create() {

        // Create entity
        const entity = new SessionEntity

        // Save
        await entity.save()

        return new this(entity)
    }

    /**
     * Record method
     * 
     * @returns
     */
    public static async record() {

        // Get entities
        const entities = await SessionEntity.find({
            order: { id: "DESC" },
            take: 20
        })

        return entities.map(entity => new this(entity))
    }

    /**
     * Find method
     * 
     * @returns
     */
    public static async find(id: unknown) {

        // Schema
        const schema = zod.number()

        // Get entity
        const entity = await SessionEntity.findOneBy({ id: schema.parse(id) })

        // Check entity
        if (!entity) throw new CoreException("Session entity was not found")

        return new this(entity)
    }

    /**
     * Update method
     * 
     * @returns
     */
    public async update() {

        // Get entity
        const entity = await SessionEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Session entity was not found")

        // Save
        await entity.save()

        return this
    }

    /**
     * Delete method
     * 
     * @returns
     */
    public async delete() {

        // Get entity
        const entity = await SessionEntity.findOneBy({ id: this.id })

        // Check entity
        if (!entity) throw new CoreException("Session entity was not found")

        await entity.remove()
    }

    /**
     * Add participant method
     * 
     * @returns
     */
    public async addParticipant(participant: Participant) {

        // Get session entity
        const sessionEntity = await SessionEntity.findOneBy({ id: this.id })

        // Check session entity
        if (!sessionEntity) throw new CoreException("Session entity was not found")

        // Get participant entity
        const participantEntity = await ParticipantEntity.findOneBy({ id: participant.id })

        // Check participant entity
        if (!participantEntity) throw new CoreException("Participant entity was not found")

        // Create session query builder
        const sessionQueryBuilder = SessionEntity.createQueryBuilder()

        // Add participant entity to session entity
        await sessionQueryBuilder.relation("participants").of(sessionEntity).add(participantEntity)
    }

    /**
     * Remove participant method
     * 
     * @returns
     */
    public async removeParticipant(participant: Participant) {

        // Get session entity
        const sessionEntity = await SessionEntity.findOneBy({ id: this.id })

        // Check session entity
        if (!sessionEntity) throw new CoreException("Session entity was not found")

        // Get participant entity
        const participantEntity = await ParticipantEntity.findOneBy({ id: participant.id })

        // Check participant entity
        if (!participantEntity) throw new CoreException("Participant entity was not found")

        // Create session query builder
        const sessionQueryBuilder = SessionEntity.createQueryBuilder()

        // Remove participant entity from session entity
        await sessionQueryBuilder.relation("participants").of(sessionEntity).remove(participantEntity)
    }

    /**
     * Add judge method
     * 
     * @returns
     */
    public async addJudge(judge: Judge) {

        // Get session entity
        const sessionEntity = await SessionEntity.findOneBy({ id: this.id })

        // Check session entity
        if (!sessionEntity) throw new CoreException("Session entity was not found")

        // Get judge entity
        const judgeEntity = await JudgeEntity.findOneBy({ id: judge.id })

        // Check judge entity
        if (!judgeEntity) throw new CoreException("Judge entity was not found")

        // Create session query builder
        const sessionQueryBuilder = SessionEntity.createQueryBuilder()

        // Add judge entity to session entity
        await sessionQueryBuilder.relation("judges").of(sessionEntity).add(judgeEntity)
    }

    /**
     * Remove judge method
     * 
     * @returns
     */
    public async removeJudge(judge: Judge) {

        // Get session entity
        const sessionEntity = await SessionEntity.findOneBy({ id: this.id })

        // Check session entity
        if (!sessionEntity) throw new CoreException("Session entity was not found")

        // Get judge entity
        const judgeEntity = await JudgeEntity.findOneBy({ id: judge.id })

        // Check judge entity
        if (!judgeEntity) throw new CoreException("Judge entity was not found")

        // Create session query builder
        const sessionQueryBuilder = SessionEntity.createQueryBuilder()

        // Remove judge entity from session entity
        await sessionQueryBuilder.relation("judges").of(sessionEntity).remove(judgeEntity)
    }

    /**
     * Participants method
     * 
     * @returns
     */
    public async participants() {

        // Participants
        const participants = await ParticipantEntity.findBy({ sessions: [{ id: this.id }] })

        return participants.map(primitiveParticipant => new Participant(primitiveParticipant))
    }

    /**
     * Judges method
     * 
     * @returns
     */
    public async judges() {

        // Judges
        const judges = await JudgeEntity.find({
            where: { sessions: [{ id: this.id }] },
            relations: { user: true }
        })

        return judges.map(primitiveJudge => new Judge({
            id: primitiveJudge.id,
            name: primitiveJudge.name,
            primary: primitiveJudge.primary,
            username: primitiveJudge.user.username,
            password: undefined
        }))
    }

    /**
     * Rating method
     * 
     * @returns
     */
    public async rating(judge: Judge, participant: Participant, score: unknown) {

        // Get session entity
        const sessionEntity = await SessionEntity.findOneBy({ id: this.id })

        // Check session entity
        if (!sessionEntity) throw new CoreException("Session entity was not found")

        // Get participant entity
        const participantEntity = await ParticipantEntity.findOneBy({ id: participant.id })

        // Check participant entity
        if (!participantEntity) throw new CoreException("Participant entity was not found")

        // Get judge entity
        const judgeEntity = await JudgeEntity.findOneBy({ id: judge.id })

        // Check judge entity
        if (!judgeEntity) throw new CoreException("Judge entity was not found")

        // Create rating entity
        const ratingEntity = await RatingEntity.findOneBy({
            participant: { id: participantEntity.id },
            session: { id: sessionEntity.id },
            judge: { id: judgeEntity.id }
        }) || new RatingEntity

        // Set score
        ratingEntity.score = zod.number().parse(score)

        // Set session
        ratingEntity.session = sessionEntity

        // Set judge
        ratingEntity.judge = judgeEntity

        // Set participant
        ratingEntity.participant = participantEntity

        // Save
        await ratingEntity.save()
    }
}

/**
 * Primitive
 * 
 */
export interface PrimitiveSession {
    id: number
}