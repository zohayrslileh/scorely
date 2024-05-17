import { readdir } from "fs/promises"
import { join } from "path"
import chalk from "chalk"

/*
|-----------------------------
|  Service
|-----------------------------
| 
|
*/
export default class Service {

    /**
     * Name
     * 
     */
    public readonly name: string

    /**
     * Executor
     * 
     */
    private readonly executor: Executor

    /**
     * Constructor method
     * 
     */
    public constructor(name: string, executor: Executor) {

        // Set name
        this.name = name

        // Set executor
        this.executor = executor
    }

    /**
     * Scan method
     * 
     * @returns
     */
    public static async scan(...paths: string[]): Promise<string[]> {

        return await readdir(join(...paths))
    }

    /**
     * Require method
     * 
     * @returns
     */
    public static require(...paths: string[]): Service {

        // Define path
        const path = join(...paths)

        // Require service
        const service = require(path)

        // Check is service
        if (!(service.default instanceof Service)) throw Error(`${path} is not a service`)

        return service.default
    }

    /**
     * Execute method
     * 
     * @returns
     */
    public async execute() {

        // Break line
        console.log()

        // Time label
        const label = chalk.green(`✔ "${chalk.bold(`${this.name}`)}" ready in `)

        // Start time
        console.time(label)

        // Execute service
        const message = await this.executor()

        // End time
        console.timeEnd(label)

        // Print Execute message
        console.log("   ⤷", message)
    }
}

/**
 * Executor
 * 
 */
export type Executor = () => (string | void | Promise<string | void>)