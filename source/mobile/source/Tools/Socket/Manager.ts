import { Manager as BaseManager, ManagerOptions, SocketOptions } from "socket.io-client"
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
     * Authorization
     * 
     */
    private readonly authorization: (() => string) | undefined

    /**
     * Constructor method
     * 
     */
    public constructor(uri?: string, options?: Options) {

        // Call parent constructor
        super(uri, options)

        // Set authorization
        this.authorization = options?.authorization
    }

    /**
     * Namespace hook
     *
     * @returns
     */
    public useNamespace(name: string, options?: Partial<SocketOptions>) {

        /**
         * Authorization
         * 
         */
        const authorization = useMemo(() => this.authorization ? this.authorization() : undefined, [])

        /**
         * Namespace
         * 
         */
        const namespace = useMemo(() => new Namespace(this.socket(name, { ...options, auth: { authorization } })), [])

        return namespace
    }
}

/**
 * Options
 * 
 */
interface Options extends Partial<ManagerOptions> {
    authorization?: () => string
}