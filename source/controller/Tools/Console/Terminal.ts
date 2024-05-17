import { spawnSync } from "child_process"
import chalk from "chalk"

/*
|-----------------------------
|  Terminal
|-----------------------------
| 
|
*/
export default class Terminal {

    /**
     * Execute method
     * 
     * @returns
     */
    public execute(command: string, cwd?: string, env: NodeJS.ProcessEnv = {}): this {

        // Get command arguments
        const argument = command.split(" ")

        // Execute child command
        const child = spawnSync(argument[0], argument.slice(1), { stdio: "inherit", shell: true, cwd, env: { ...process.env, ...env } })

        // Check status
        if (child.status && child.status !== 0) process.exit(child.status)

        return this
    }

    /**
     * Break method
     * 
     * @returns
     */
    public get break(): this {

        // Print empty line
        console.log()

        return this
    }

    /**
     * Step method
     * 
     * @returns
     */
    public step(name: string): this {

        // Print template
        console.log(chalk.blue("✔ [STEP]"), chalk.yellow(name))

        return this
    }

    /**
     * Light method
     * 
     * @returns
     */
    public light(title: string): this {

        // Print template
        console.log(chalk.gray(title))

        return this
    }

    /**
     * Clear method
     * 
     * @returns
     */
    public get clear(): this {

        // Clear console space
        console.clear()

        return this
    }
}