import { HonoOptions } from "hono/hono-base"
import { Env, Hono } from "hono"

/*
|-----------------------------
|  Router
|-----------------------------
| 
|
*/
export default class Router<Environment extends Env> extends Hono<Environment> {

    /**
     * Create method
     * 
     * @returns
     */
    public static create<Environment extends Env>(deepRouter: DeepRouter<Environment>, options?: HonoOptions<Environment>): Hono<Environment> {

        // Create router
        const router = new Router(options)

        // Execute Deep Router
        deepRouter(router)

        return router
    }
}

/**
 * Deep Router
 * 
 */
export type DeepRouter<Environment extends Env> = (router: Hono<Environment>) => void