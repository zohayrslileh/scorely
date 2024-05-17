
/*
|-----------------------------
|  Router
|-----------------------------
| 
|
*/
export default class Router {

    /**
     * Index handler
     * 
     */
    private indexHandler: Handler | undefined

    /**
     * Other handler
     * 
     */
    private otherHandler: Handler | undefined

    /**
     * Handlers
     * 
     */
    private handlers: Record<string, Handler | undefined> = {}

    /**
     * Create method
     * 
     * @returns
     */
    public static create(deepRouter: DeepRouter) {

        // Create new router
        const router = new Router

        // Set routes
        deepRouter(router)

        return router
    }

    /**
     * Index method
     * 
     * @returns
     */
    public index(handler: Handler) {

        // Set index handler
        this.indexHandler = handler
    }

    /**
     * Route method
     * 
     * @returns
     */
    public route(route: string, handler: Handler) {

        // Set handler
        this.handlers[route] = handler
    }

    /**
     * Other method
     * 
     * @returns
     */
    public other(handler: Handler) {

        // Set other handler
        this.otherHandler = handler
    }

    /**
     * Execute method
     * 
     * @returns
     */
    public async execute(params: string[], flags: Flags) {

        // Route
        const route = params[0]

        // Handler
        const handler = route ? this.handlers[route] || this.otherHandler : this.indexHandler

        // Check handler
        if (!handler) return

        // Passing params
        const passingParams = params.slice(1)

        // Handler as router
        if (handler instanceof Router) await handler.execute(passingParams, flags)

        // Handler as callback
        else {

            // Callback result
            const result = await handler({ params: passingParams, flags })

            // Check result
            if (result) {

                // Result as router
                if (result.default instanceof Router) await result.default.execute(passingParams, flags)

                // Result as callback
                else await result.default({ params: passingParams, flags })
            }
        }
    }
}

/**
 * CLI Handler
 * 
 */
export type CLIHandler = (argument: Arguments) => Require | Promise<void> | void

/**
 * Handler
 * 
 */
export type Handler = Router | CLIHandler

/**
 * Require
 * 
 */
export interface Require {
    default: Router | CLIHandler
}

/**
 * Arguments
 * 
 */
export interface Arguments {
    params: string[]
    flags: Flags
}

/**
 * Flags
 * 
 */
export type Flags = Record<string, string | boolean>

/**
 * Deep router
 * 
 */
export type DeepRouter = (router: Router) => void