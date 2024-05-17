import WsException from "@/Services/Server/Socket/Exception/Exceptions"
import Router from "@/Tools/Socket/Router"
import zod from "zod"

/*
|-----------------------------
| Meet
|-----------------------------
|
*/
export default new Router(function (meet) {

    /**
     * On connection
     * 
     */
    meet.onConnection(function (client) {

        /**
         * On rooms
         * 
         */
        client.on("rooms", () => client.socket.emit("rooms", rooms))

        /**
         * On create room
         * 
         */
        client.on("create:room", function (_, room: unknown) {

            // Generate schema
            const schema = zod.object({
                name: zod.string().min(5).max(20)
            })

            // Validate
            const { name } = schema.parse(room)

            // Verify that this room has already been created
            if (rooms.find(room => room.name === name)) throw new WsException("This room is already created")

            // Push room
            rooms.push({ name })

            // Emit rooms
            meet.namespace.emit("rooms", rooms)

        })

        /**
         * Join
         * 
         */
        client.on("join", async function (_, name: string) {

            // Join to the room
            client.socket.join(name)
        })

        /**
         * On offer
         * 
         */
        client.on("offer", async function (_, name: string, offer: unknown) {

            // Verify that this room has found
            if (!rooms.find(room => room.name === name)) throw new WsException("This room was not found")

            // Members
            const members = await client.socket.in(name).fetchSockets()

            // Ask answer
            for (const member of members) client.socket.emit("answer", await member.timeout(10000).emitWithAck("offer", offer))

        })

        /**
         * On candidate
         * 
         */
        client.on("candidate", (_, name: string, candidate: unknown) => client.socket.in(name).emit("candidate", candidate))

    })

})

/**
 * Rooms
 * 
 */
const rooms: Room[] = []

/**
 * Room
 * 
 */
interface Room {
    name: string
}