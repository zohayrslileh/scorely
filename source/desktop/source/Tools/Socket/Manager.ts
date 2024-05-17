import { Manager as BaseManager, SocketOptions } from "socket.io-client"
import Namespace from "./Namespace"
import { useMemo } from "react"

/*
|-----------------------------
|  Manager
|-----------------------------
|
|
*/
export default class Manager extends BaseManager {

    /**
     * Namespace hook
     *
     * @returns
     */
    public useNamespace(name: string, options?: Partial<SocketOptions>) {

        /**
         * Namespace
         * 
         */
        const namespace = useMemo(() => new Namespace(this.socket(name, options)), [])

        /**
         * Connected
         * 
         */
        const connected = namespace.useConnected()

        return Object.assign(namespace, { connected })
    }
}