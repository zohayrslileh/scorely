import WsException from "@/Services/Server/Socket/Exception/Exceptions"
import Authentication from "@/Core/Authentication"
import Participant from "@/Core/Participant"
import Router from "@/Tools/Socket/Router"
import Session from "@/Core/Session"
import { Socket } from "socket.io"
import Judge from "@/Core/Judge"
import zod from "zod"

/*
|-----------------------------
| Main
|-----------------------------
|
*/
export default new Router(function (main) {

    // On connection
    main.onConnection(async function (client) {

        // Authorization
        const authorization = client.socket.handshake.auth.authorization

        // Authentication
        const authentication = new Authentication(authorization)

        // User
        const user = await authentication.verify()

        // Judge
        const judge = await user.getJudge()

        // Role
        const role = await user.getRole()

        // Is judge
        if (judge) {

            // Append to judge sockets
            judgeSockets.push({ socket: client.socket, id: judge.id })

            // On disconnect 
            client.onDisconnect(function () {

                judgeSockets = judgeSockets.filter(judgeSocket => judgeSocket.socket !== client.socket)
            })
        }

        // Is admin
        else if (role && role.name === "admin") {

            // On join
            client.on("join", function (_, sessionId: unknown) {

                // Append to admin sockets
                if (!adminSockets.find(adminSocket => adminSocket.socket === client.socket)) adminSockets.push({
                    socket: client.socket,
                    id: user.id,
                    sessionId: zod.number().parse(sessionId)
                })
            })

            // On disconnect 
            client.onDisconnect(function () {

                adminSockets = adminSockets.filter(adminSocket => adminSocket.socket !== client.socket)
            })

            // On add participant
            client.on("add-participant", async function (_, sessionId: unknown, participantId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Participant
                const participant = await Participant.find(participantId)

                // Add participant to session
                await session.addParticipant(participant)

                // Emit to admins
                for (const adminSocket of adminSockets) {

                    if (adminSocket.socket !== client.socket && adminSocket.sessionId === session.id) adminSocket.socket.emit("add-participant", participant)
                }

                // Emit to broadcast admins
                client.socket.broadcast.in("admins")

                return participant
            })

            // On remove participant
            client.on("remove-participant", async function (_, sessionId: unknown, participantId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Participant
                const participant = await Participant.find(participantId)

                // Remove participant to session
                await session.removeParticipant(participant)

                // Emit to admins
                for (const adminSocket of adminSockets) {

                    if (adminSocket.socket !== client.socket && adminSocket.sessionId === session.id) adminSocket.socket.emit("remove-participant", participant.id)
                }

                return participant
            })

            // On add judge
            client.on("add-judge", async function (_, sessionId: unknown, judgeId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Judge
                const judge = await Judge.find(judgeId)

                // Add judge to session
                await session.addJudge(judge)

                // Emit to admins
                for (const adminSocket of adminSockets) {

                    if (adminSocket.socket !== client.socket && adminSocket.sessionId === session.id) adminSocket.socket.emit("add-judge", judge)
                }

                return judge
            })

            // On remove judge
            client.on("remove-judge", async function (_, sessionId: unknown, judgeId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Judge
                const judge = await Judge.find(judgeId)

                // Remove judge to session
                await session.removeJudge(judge)

                // Emit to admins
                for (const adminSocket of adminSockets) {

                    if (adminSocket.socket !== client.socket && adminSocket.sessionId === session.id) adminSocket.socket.emit("remove-judge", judge.id)
                }

                return judge
            })

            // On ask rate
            client.on("ask-rate", async function (_, sessionId: unknown, participantId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Participant
                const participant = await Participant.find(participantId)

                // Judges
                const judges = await session.judges()

                // Emit to judges
                for (const judgeSocket of judgeSockets) {

                    if (judges.find(judge => judge.id === judgeSocket.id)) judgeSocket.socket.emit("order", { session, participant })
                }

                return { session, participant }
            })
        }

        // Other
        else throw new WsException("You do not have standing to join")
    })
})

/**
 * Admin Socket
 * 
 */
var adminSockets: AdminSocket[] = []

/**
 * Judge Socket
 * 
 */
var judgeSockets: JudgeSocket[] = []

/**
 * Admin Socket
 * 
 */
interface AdminSocket {
    socket: Socket
    id: number
    sessionId: number
}

/**
 * Judge Socket
 * 
 */
interface JudgeSocket {
    socket: Socket
    id: number
}