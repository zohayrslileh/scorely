import PendingException from "@/View/Exception/Exceptions/Pending"
import ViewException from "@/View/Exception/Exceptions"
import { PrimitiveOrder } from "@/Core/Order"
import manager from "@/Models/Server/Socket"
import { Throw } from "@/Tools/Exception"
import Order from "./Order"
import Logo from "./Logo"

/**
 * Socket
 * 
 * @returns 
 */
export default function () {

    /**
     * Main
     * 
     */
    const main = manager.useNamespace("/main")

    /**
     * Connected
     * 
     */
    const connected = main.useConnected()

    /**
     * Order
     * 
     */
    const order = main.useState<PrimitiveOrder>("order")

    /**
     * Error
     * 
     */
    const error = main.useError()

    // Error status
    if (error) return <Throw exception={new ViewException(error)} />

    // Pending status
    if (!connected) return <Throw exception={new PendingException("connecting")} />

    return order ? <Order namespace={main} value={order} /> : <Logo />
}