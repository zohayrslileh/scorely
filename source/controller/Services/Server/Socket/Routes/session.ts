import Authentication from "@/Core/Authentication"
import Router from "@/Tools/Socket/Router"

/*
|-----------------------------
| Session
|-----------------------------
|
*/
export default new Router(function (session) {

    // On connection
    session.onConnection(async function (client) {

        // Authorization
        const authorization = client.socket.handshake.auth.authorization

        // Authentication
        const authentication = new Authentication(authorization)

        // User
        const user = await authentication.verify()

        // Role
        const role = await user.getRole()

        console.log(role)

    })
})