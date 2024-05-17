import Client, { ExceptionHandler } from "./Client"
import { Namespace, Server } from "socket.io"

/*
|-----------------------------
|  Router
|-----------------------------
|
| 
*/
export default class Router {

    /**
     * Server
     * 
     */
    private server: Server | undefined

    /**
     * Namespace
     * 
     */
    private Namespace: Namespace | undefined

    /**
     * Routes
     * 
     */
    private readonly routes: string[] = []

    /**
     * Middlewares
     * 
     */
    private readonly middlewares: MiddlewareHandler[] = []

    /**
     * Exception Handler
     * 
     */
    private exceptionHandler: ExceptionHandler | undefined

    /**
     * Deep router
     * 
     */
    private readonly deepRouter: RouterHandler

    /**
     * Constructor method
     * 
     */
    public constructor(deepRouter: RouterHandler) {

        // Set Deep Router
        this.deepRouter = deepRouter
    }

    /**
     * Route method
     * 
     * @returns
     */
    public route(name: string, router: Router): void {

        // Check Server
        if (!this.server) throw new Error("Server was not found")

        // Execute router
        router.execute(this.server, [...this.routes, name], [...this.middlewares], this.exceptionHandler)
    }

    /**
     * Get namespace
     * 
     * @returns
     */
    public get namespace(): Namespace {

        // Check if namespace has initialize
        if (this.Namespace) return this.Namespace

        // Check server
        if (!this.server) throw new Error("Server not found")

        // Set namespace
        this.Namespace = this.server.of(this.routes.join("/"))

        return this.Namespace
    }

    /**
     * Middleware method
     * 
     * @returns
     */
    public middleware(...handlers: MiddlewareHandler[]) {

        // Set middlewares
        this.middlewares.push(...handlers)
    }

    /**
     * On exception method
     * 
     * @returns
     */
    public onException(handler: ExceptionHandler) {

        // Set Exception Handler
        this.exceptionHandler = handler
    }

    /**
     * On connection method
     * 
     * @returns
     */
    public onConnection(handler: ConnectionHandler) {

        // Middlewares
        const middlewares = [...this.middlewares]

        // On connection
        this.namespace.on("connection", async (socket) => {

            // Create client
            const client = new Client(socket, this.exceptionHandler)

            try {

                // Await middlewares hanlders
                for (const middleware of middlewares) await middleware(client)

                // Await handler
                await handler(client)

            } catch (exception) {

                // Pass to exception handler
                if (this.exceptionHandler) this.exceptionHandler(client, exception)

                // Disconnect
                socket.disconnect()
            }
        })
    }

    /**
     * Execute method
     * 
     * @returns
     */
    public execute(server: Server, routes?: string[], middlewares?: MiddlewareHandler[], exceptionHandler?: ExceptionHandler) {

        // Set server
        this.server = server

        // Set routes
        if (routes) this.routes.push(...routes)

        // Set middlewares
        if (middlewares) this.middlewares.push(...middlewares)

        // Set exception handler
        if (exceptionHandler) this.exceptionHandler = exceptionHandler

        // Fetch Deep Router
        this.deepRouter(this)
    }
}

/**
 * Router Handler
 * 
 */
export type RouterHandler = (router: Router) => void

/**
 * Middleware Handler
 * 
 */
export type MiddlewareHandler = (client: Client) => (void | Promise<void>)

/**
 * Connection Handler
 * 
 */
export type ConnectionHandler = MiddlewareHandler