import WsException from "@/Services/Server/Socket/Exception/Exceptions"
import Authentication from "@/Core/Authentication"
import Participant from "@/Core/Participant"
import Router from "@/Tools/Socket/Router"
import Session from "@/Core/Session"
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

        // Judge
        const judge = await user.getJudge()

        // Role
        const role = await user.getRole()

        // Is judge
        if (judge) {

            // Join to judges
            client.socket.join("judges")
        }

        // Is admin
        else if (role && role.name === "admin") {

            // Join to admins
            client.socket.join("admins")

            // On add participant
            client.on("add-participant", async function (_, sessionId: unknown, participantId: unknown) {

                // Session
                const session = await Session.find(sessionId)

                // Participant
                const participant = await Participant.find(participantId)

                // Add participant to session
                await session.addParticipant(participant)

                // Emit to broadcast admins
                client.socket.broadcast.in("admins").emit("add-participant", participant)

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

                // Emit to broadcast admins
                client.socket.broadcast.in("admins").emit("add-judge", judge)

                return judge
            })
        }

        // Other
        else throw new WsException("You do not have standing to join")
    })
})