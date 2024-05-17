import type { Namespace, Socket } from "socket.io"

/*
|-----------------------------
|  Client
|-----------------------------
|
| 
*/
export default class Client {

    /**
     * Socket
     * 
     */
    public readonly socket: Socket

    /**
     * Namespace
     * 
     */
    public readonly namespace: Namespace

    /**
     * Exception Handler
     * 
     */
    private readonly exceptionHandler: ExceptionHandler | undefined

    /**
     * Constructor method
     * 
     */
    public constructor(socket: Socket, exceptionHandler?: ExceptionHandler) {

        // Set socket
        this.socket = socket

        // Set namespace
        this.namespace = socket.nsp

        // Set exception handler
        this.exceptionHandler = exceptionHandler
    }

    /**
     * On method
     *  
     * @returns
     */
    public on(event: string, handler: EventHandler) {

        /**
         * Start listening method
         * 
         * @returns 
         */
        const startListening = () => this.socket.on(event, listener)

        /**
         * Stop listening method
         * 
         * @returns 
         */
        const stopListening = () => this.socket.off(event, listener)

        /**
         * Listener method
         * 
         * @returns
         */
        const listener = async (...params: any[]) => {

            // Callback
            const callback = params[params.length - 1]

            // Remove callback if is a function
            if (typeof callback === "function") params.pop()

            // Promise resolve
            const resolve: Resolve | undefined = typeof callback === "function" ? response => callback({ response }) : undefined

            // Promise reject
            const reject: Reject | undefined = typeof callback === "function" ? (response, code) => callback({ error: { response, code } }) : undefined

            // Event
            const event: Event = {
                resolve: resolve || (() => null),
                reject: reject || (() => null),
                startListening,
                stopListening,
                client: this
            }

            try {

                // Handle
                const solve = await handler(event, ...params)

                // Solving promise
                if (resolve) resolve(solve)

            } catch (exception) {

                // Pass To Exception Handler
                if (this.exceptionHandler) this.exceptionHandler(this, exception, reject)

            }
        }

        // Start Listening
        startListening()

        return { startListening, stopListening }
    }

    /**
     * On disconnect method
     *  
     * @returns
     */
    public onDisconnect(handler: EventHandler) {

        return this.on("disconnect", handler)
    }

    /**
     * Catch exception
     * 
     * @returns
     */
    public catchException(exception: unknown) {

        if (this.exceptionHandler) this.exceptionHandler(this, exception)
    }

    /**
     * Ask method
     * 
     * @returns
     */
    public async ask<Response>(event: string, ...params: unknown[]): Promise<Response> {

        return await this.socket.emitWithAck(event, ...params)
    }
}

/**
 * Event Handler
 * 
 */
export type EventHandler = (event: Event, ...params: any[]) => unknown

/**
 * Event
 * 
 */
export interface Event {
    startListening: StartListening
    stopListening: StopListening
    resolve: Resolve
    client: Client
    reject: Reject
}

/**
 * Reject
 * 
 */
export type Reject = (response: unknown, code: string) => void

/**
 * Resolve
 * 
 */
export type Resolve = (response: unknown) => void

/**
 * Start Listening
 * 
 */
export type StartListening = () => void

/**
 * Stop Listening
 * 
 */
export type StopListening = () => void

/**
 * Exception Handler
 * 
 */
export type ExceptionHandler = (client: Client, exception: unknown, reject?: Reject) => void