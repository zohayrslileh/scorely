import WsException from "@/Services/Server/Socket/Exception/Exceptions"
import Authentication from "@/Core/Authentication"
import Router from "@/Tools/Socket/Router"

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

        // On judge join
        client.on("judge-join", async function () {

            // Check has joined
            if (client.socket.rooms.has("judges")) throw new WsException("You are adeady joined to judges")

            // Judge
            const judge = await user.getJudge()

            // Check judge
            if (!judge) throw new WsException("You not judge")

            // join
            client.socket.join("judges")
        })

        // On admin join
        client.on("admin-join", async function () {

            // Check has joined
            if (client.socket.rooms.has("admins")) throw new WsException("You are adeady joined to admins")

            // Role
            const role = await user.getRole()

            // Check admin
            if (!role || role.name !== "admin") throw new WsException("You not admin")

            // join
            client.socket.join("admins")
        })
    })
})