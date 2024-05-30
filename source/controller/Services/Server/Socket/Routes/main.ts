import WsException from "@/Services/Server/Socket/Exception/Exceptions"
import UserEntity from "@/Models/Database/Entities/User"
import Authentication from "@/Core/Authentication"
import Participant from "@/Core/Participant"
import Router from "@/Tools/Socket/Router"
import Session from "@/Core/Session"
import { Socket } from "socket.io"
import Judge from "@/Core/Judge"

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

        // Judge entity
        const judgeEntity = await user.getJudge()

        // Role
        const role = await user.getRole()

        // Is judge
        if (judgeEntity) {

            // Judge
            const judge = await Judge.find(judgeEntity.id)

            // Emit to admins
            for (const adminSocket of adminSockets) adminSocket.socket.emit("judge-connect", judge)

            // Append to judge sockets
            judgeSockets.push({ socket: client.socket, judge })

            // Next order
            const nextOrder = orders.find(order => order.judge.id === judge.id)

            // Emit
            if (nextOrder) client.socket.emit("order", nextOrder)

            // On disconnect 
            client.onDisconnect(function () {

                judgeSockets = judgeSockets.filter(judgeSocket => judgeSocket.socket !== client.socket)

                // Emit to admins
                for (const adminSocket of adminSockets) adminSocket.socket.emit("judge-desconnect", judge)
            })

            // On skip
            client.on("skip", async function (_, sessionId: unknown, participantId: unknown) {

                // Order
                const order = orders.find(order => order.judge.id === judge.id && order.session.id === sessionId && order.participant.id === participantId)

                // Check order
                if (!order) throw new WsException("This order was not found")

                // Update orders
                orders = orders.filter(item => item !== order)

                // Next order
                const nextOrder = orders.find(order => order.judge.id === judge.id)

                // Fetch judge sockets
                for (const judgeSocket of judgeSockets.filter(judgeSocket => judgeSocket.judge.id === judge.id)) {

                    // Emit
                    judgeSocket.socket.emit("order", nextOrder)
                }
            })

            // On answer
            client.on("answer", async function (_, sessionId: unknown, participantId: unknown, score: unknown) {

                // Order
                const order = orders.find(order => order.judge.id === judge.id && order.session.id === sessionId && order.participant.id === participantId)

                // Check order
                if (!order) throw new WsException("This order was not found")

                // Session
                const session = await Session.find(sessionId)

                // Participant
                const participant = await Participant.find(participantId)

                // Rating
                await session.rating(judge, participant, score)

                // Update orders
                orders = orders.filter(item => item !== order)

                // Next order
                const nextOrder = orders.find(order => order.judge.id === judge.id)

                // Fetch judge sockets
                for (const judgeSocket of judgeSockets.filter(judgeSocket => judgeSocket.judge.id === judge.id)) {

                    // Emit
                    judgeSocket.socket.emit("order", nextOrder)
                }
            })
        }

        // Is admin
        else if (role && role.name === "admin") {

            // On join
            client.on("join", async function (_, sessionId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Append to admin sockets
                if (!adminSockets.find(adminSocket => adminSocket.socket === client.socket)) adminSockets.push({
                    socket: client.socket,
                    session,
                    user
                })
            })

            // On initialize judges
            client.on("initialize-judges", async function (_, sessionId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Judges
                const judges = await session.judges()

                // Online judges
                const onlineJudges = judges.filter(function (judge) {

                    return !!judgeSockets.find(judgeSocket => judgeSocket.judge.id === judge.id)
                })

                // Emit online judges
                client.socket.emit("online-judges", onlineJudges)

                // Fetch judges
                for (const judge of judges) {

                    // Emit pending orders
                    client.socket.emit("pending-orders", judge, orders.filter(order => order.judge.id === judge.id).length)
                }
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

                    if (adminSocket.socket !== client.socket && adminSocket.session.id === session.id) adminSocket.socket.emit("add-participant", participant)
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

                    if (adminSocket.socket !== client.socket && adminSocket.session.id === session.id) adminSocket.socket.emit("remove-participant", participant.id)
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

                // Is online
                const isOnline = !!judgeSockets.find(judgeSocket => judgeSocket.judge.id === judge.id)

                // Emit to admins
                for (const adminSocket of adminSockets) {

                    if (adminSocket.socket !== client.socket && adminSocket.session.id === session.id) adminSocket.socket.emit("add-judge", judge, isOnline)
                }

                return isOnline
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

                    if (adminSocket.socket !== client.socket && adminSocket.session.id === session.id) adminSocket.socket.emit("remove-judge", judge.id)
                }

                // Cancel orders
                orders = orders.filter(order => !(order.judge.id === judge.id && order.session.id === session.id))

                // Next order
                const nextOrder = orders.find(order => order.judge.id === judge.id)

                // Fetch judge sockets
                for (const judgeSocket of judgeSockets.filter(judgeSocket => judgeSocket.judge.id === judge.id)) {

                    // Emit
                    judgeSocket.socket.emit("order", nextOrder)
                }

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

                    // Order order
                    const oldOrder = orders.find(order => order.judge.id === judge.id && order.participant.id === participant.id && order.session.id === session.id)

                    // Check old order
                    if (oldOrder) continue

                    // Order
                    const order: Order = { session, judge, participant }

                    // Push to orders
                    orders.push(order)

                    // Next order
                    const nextOrder = orders.find(order => order.judge.id === judge.id)

                    // Is current order
                    if (order === nextOrder) {

                        // Fetch judge sockets
                        for (const judgeSocket of judgeSockets.filter(judgeSocket => judgeSocket.judge.id === judge.id)) {

                            // Emit
                            judgeSocket.socket.emit("order", order)
                        }
                    }
                }
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
    user: UserEntity
    session: Session
}

/**
 * Judge Socket
 * 
 */
interface JudgeSocket {
    socket: Socket
    judge: Judge
}

/**
 * Order
 * 
 */
interface Order {
    judge: Judge
    session: Session
    participant: Participant
}