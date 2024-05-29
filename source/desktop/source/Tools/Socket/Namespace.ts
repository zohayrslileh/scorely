import { DependencyList, useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import EventError from "./EventError"

/*
|-----------------------------
|  Namespace
|-----------------------------
|
|
*/
export default class Namespace {

    /**
     * Socket
     * 
     */
    public readonly socket: Socket

    /**
     * Constructor method
     * 
     */
    public constructor(socket: Socket) {

        // Set socket
        this.socket = socket
    }

    /**
     * On hook
     * 
     * @returns
     */
    public useOn(event: string, handler: EventHandler, dependencies: DependencyList = []) {

        /**
         * When a change in dependencies is detected
         * 
         */
        useEffect(() => {

            /**
             * Listener method
             * 
             * @returns
             */
            const listener = async function (...params: unknown[]) {

                // Get callback
                const callback = params[params.length - 1]

                // Remove last param if is callback
                if (typeof callback === "function") params.pop()

                // Hanlde
                const solve = await handler(...params)

                // Solving
                if (typeof callback === "function") callback(solve)

            }

            // On event
            this.socket.on(event, listener)

            /**
             * When a change in dependencies
             * 
             */
            return () => {

                // Off event
                this.socket.off(event, listener)
            }

        }, dependencies)
    }

    /**
     * State hook
     * 
     * @returns
     */
    public useState<State>(event: string) {

        /**
         * State
         * 
         */
        const [state, setState] = useState<State | undefined>(undefined)

        /**
         * On event
         * 
         */
        this.useOn(event, setState)

        return state
    }

    /**
     * Store hook
     * 
     * @returns
     */
    public useStore<State>(event: string, limit: number) {

        /**
         * Store
         * 
         */
        const [store, setStore] = useState<State[]>([])

        /**
         * On event
         * 
         */
        this.useOn(event, (state: State) => setStore(store => [...store, state].slice(limit * -1)))

        return store
    }

    /**
     * Connected hook
     * 
     * @returns
     */
    public useConnected() {

        /**
         * Connected state
         * 
         */
        const [connected, setConnected] = useState(this.socket.connected)

        /**
         * On connect
         * 
         */
        this.useOn("connect", () => setConnected(true))

        /**
         * On disconnect
         * 
         */
        this.useOn("disconnect", () => setConnected(false))

        /**
         * Before Effect
         * 
         */
        useEffect(() => {

            // Connect
            this.socket.connect()

            /**
             * After Effect
             * 
             */
            return () => {

                // Disconnect
                this.socket.disconnect()
            }

        }, [])

        return connected
    }

    /**
     * Error hook
     * 
     * @returns
     */
    public useError() {

        return this.useState<string>("error")
    }

    /**
     * Ask method
     * 
     * @returns
     */
    public async ask<Response>(event: string, ...params: unknown[]): Promise<Response> {

        // Emit with ack
        const { error, response } = await this.socket.timeout(10000).emitWithAck(event, ...params)

        // Check error
        if (error) throw new EventError(error.response, error.code)

        return response
    }
}

/**
 * Event Handler
 * 
 */
export type EventHandler = (...params: any[]) => unknown