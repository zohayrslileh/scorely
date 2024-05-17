import { createWriteStream, existsSync, lstatSync, mkdirSync, readdirSync } from "fs"
import { readdir, copyFile, rmdir, unlink, mkdir } from "fs/promises"
import { join, resolve, sep, extname, dirname } from "path"
import { spawnSync } from "child_process"
import archiver from "archiver"

/*
|---------------------------------------
| Navigator
|---------------------------------------
|
|
*/
export default class Navigator {

    /**
     * Directory
     * 
     */
    private directory: string

    /**
     * Options
     * 
     */
    private readonly options?: Partial<Options>

    /**
     * Ignores
     * 
     */
    private ignores?: string[]

    /**
     * Constructor method
     * 
     */
    public constructor(directory: string = ".", options?: Partial<Options>) {

        // Set directory
        this.directory = resolve(directory)

        // Set options
        this.options = options

        // Check directory if not exists
        if (!existsSync(this.directory) || !lstatSync(this.directory).isDirectory()) {

            // Make dir
            if (this.options?.force) mkdirSync(this.directory, { recursive: true })

            // If not found
            else throw new Error(`Can't found "${this.directory}" directory, use force options to create`)
        }
    }

    /**
     * Go method
     * 
     * @returns
     */
    public go(directory: string): this {

        // Full directory
        const fullDirectory = join(this.directory, directory)

        // Check is directory
        if (!lstatSync(fullDirectory).isDirectory())
            throw new Error(`Not found ${fullDirectory} directory`)

        // Set directory
        this.directory = fullDirectory

        return this
    }

    /**
     * Back method
     * 
     * @returns
     */
    public back(times: number = 1): this {

        // Split directory
        const splitDirectory = this.directory.split(sep)

        // Update directory
        this.directory = splitDirectory.slice(0, splitDirectory.length - times).join(sep)

        return this
    }

    /**
     * Make method
     * 
     * @returns
     */
    public make(directory: string): this {

        // Make directory
        mkdirSync(join(this.directory, directory), { recursive: true })

        return this.go(directory)
    }

    /**
     * Ignore method
     * 
     * @returns
     */
    public ignore(ignores: string[]): this {

        // Set ignores
        this.ignores = ignores

        return this
    }

    /**
     * In ignores method
     * 
     * @returns
     */
    private inIgnores(subPath: string): boolean {

        // Check ignores
        if (!this.ignores) return false

        return this.ignores.find(ignore => {

            return subPath.startsWith(ignore) || `*${extname(subPath)}` === ignore
        }) ? true : false
    }

    /**
     * Scan method
     * 
     * @returns
     */
    public async scan(onFound: Founder, directory: string = this.directory, parent?: string): Promise<void> {

        // Start scan
        for (const subPath of await readdir(directory)) {

            // Sub parent
            const subParent = parent ? `${parent}/${subPath}` : subPath

            // Full child
            const fullChild = join(directory, subPath)

            // Check in ignores
            if (this.inIgnores(subParent)) continue

            // Is directory
            const isDirectory = lstatSync(fullChild).isDirectory()

            // Scan child
            if (isDirectory) await this.scan(onFound, fullChild, subParent)

            // On found callback
            await onFound({ isDirectory, subPath: subParent, fullPath: fullChild })
        }
    }

    /**
     * Copy methodd
     * 
     * @returns
     */
    public async clear(): Promise<void> {

        // Scan
        await this.scan(async ({ isDirectory, fullPath }) => {

            // Remove directory if empty
            if (isDirectory && readdirSync(fullPath).length === 0)
                await rmdir(fullPath)

            // Remove file
            else if (!isDirectory) await unlink(fullPath)
        })
    }

    /**
     * Delete methodd
     * 
     * @returns
     */
    public async delete(): Promise<void> {

        // Clear
        await this.clear()

        // Remove base directory if empty
        if (readdirSync(this.directory).length === 0) await rmdir(this.directory)
    }

    /**
     * Copy methodd
     * 
     * @returns
     */
    public async copy(distension: string): Promise<void> {

        // Full distension
        const fullDistension = resolve(distension)

        // Create distension
        await mkdir(fullDistension, { recursive: true })

        // Scan
        await this.scan(async ({ isDirectory, subPath, fullPath }) => {

            // Ignore directories and distension
            if (isDirectory || fullPath.startsWith(fullDistension)) return

            // directory
            const directory = dirname(join(distension, subPath))

            // Make dir
            if (!existsSync(directory)) await mkdir(directory, { recursive: true })

            // Copy
            await copyFile(fullPath, join(distension, subPath))
        })
    }

    /**
     * Move methodd
     * 
     * @returns
     */
    public async move(distension: string): Promise<void> {

        // Copy
        await this.copy(distension)

        // Delete
        await this.delete()
    }

    /**
     * Compress method
     * 
     * @returns
     */
    public async compress(distension: string): Promise<void> {

        // Full distension
        const fullDistension = resolve(distension)

        // Create distension
        await mkdir(dirname(fullDistension), { recursive: true })

        // Create stream
        const stream = createWriteStream(fullDistension)

        // Create archive
        const archive = archiver('zip', { zlib: { level: 9 } })

        // Pipe archive
        archive.pipe(stream)

        // Scan
        await this.scan(async ({ isDirectory, subPath, fullPath }) => {

            // Ignore directories and distension
            if (isDirectory || fullPath.startsWith(fullDistension)) return

            archive.file(fullPath, { name: subPath })
        })

        // Finalize
        await archive.finalize()
    }

    /**
     * Execute method
     * 
     * @returns
     */
    public execute(command: string, env: NodeJS.ProcessEnv = {}): this {

        // Get command arguments
        const argument = command.split(" ")

        // Execute child command
        const child = spawnSync(argument[0], argument.slice(1), { stdio: "inherit", shell: true, cwd: this.directory, env: { ...process.env, ...env } })

        // Check status
        if (child.status && child.status !== 0) process.exit(child.status)

        return this
    }
}

/**
 * Founder
 * 
 */
export type Founder = (params: { isDirectory: boolean, subPath: string, fullPath: string }) => Promise<void>

/**
 * Options
 * 
 */
export interface Options {
    force: boolean
}