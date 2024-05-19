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

            // Get judge
            const judge = await user.getJudge()

            // Check judge
            if (!judge) throw new WsException("You are not judge")
        })
    })
})