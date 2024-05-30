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
            judgeSockets.push({ socket: client.socket, judgeId: judge.id })

            // Next order
            const nextOrder = orders.find(order => order.judgeId = judge.id)

            // Emit
            if (nextOrder) client.socket.emit("order", nextOrder)

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
                    userId: user.id,
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

                // Judge socket
                const judgeSocket = judgeSockets.find(judgeSocket => judgeSocket.judgeId === judge.id)

                // Cancel orders
                orders = orders.filter(order => !(order.judgeId === judge.id && order.sessionId === session.id))

                // Empty order
                if (judgeSocket) judgeSocket.socket.emit("order", undefined)

                return judge
            })

            // On ask rate
            client.on("ask-rate", async function (_, sessionId: unknown, participantId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Participant
                const participant = await Participant.find(participantId)

                // Fetch judges
                for (const judge of await session.judges()) {

                    // Order
                    const order: Order = { judgeId: judge.id, sessionId: session.id }

                    // Push to orders
                    orders.push(order)

                    // Judge socket
                    const judgeSocket = judgeSockets.find(judgeSocket => judgeSocket.judgeId === judge.id)

                    // Emit to judge
                    if (judgeSocket) judgeSocket.socket.emit("order", order)
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
 * Orders
 * 
 */
var orders: Order[] = []

/**
 * Admin Socket
 * 
 */
interface AdminSocket {
    socket: Socket
    userId: number
    sessionId: number
}

/**
 * Judge Socket
 * 
 */
interface JudgeSocket {
    socket: Socket
    judgeId: number
}

/**
 * Order
 * 
 */
interface Order {
    judgeId: number
    sessionId: number
}