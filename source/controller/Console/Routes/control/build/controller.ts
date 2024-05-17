import { readFile, writeFile } from "fs/promises"
import Terminal from "@/Tools/Console/Terminal"
import tsconfig from "@/Models/Config/tsconfig"
import Navigator from "@/Tools/Navigator"
import { minify } from "uglify-js"
import { extname } from "path"
import chalk from "chalk"

/*
|-----------------------------
|  Controller builder
|-----------------------------
|
|
*/
export default async function () {

    // Open terminal
    const terminal = new Terminal

    terminal.break.step("Build Controller").break // New Step

    // Source path
    const sourcePath = tsconfig.compilerOptions.baseUrl

    // Distribution path
    const distPath = tsconfig.compilerOptions.outDir

    // Make distribution directory and clear
    await new Navigator(distPath, { force: true }).clear()

    // Run build command
    terminal.execute("npx tsc")

    // Minify JS
    await new Navigator(distPath).scan(async function ({ isDirectory, fullPath, subPath }) {

        // Skeep if is directory
        if (isDirectory || extname(fullPath) !== ".js") return

        // Original code
        const originalCode = await readFile(fullPath, { encoding: "utf8" })

        console.log("Minify: ", chalk.green(subPath))

        // Save minify code
        await writeFile(fullPath, minify(originalCode, { ie8: true }).code)
        
    })

    // Copy other files
    await new Navigator(sourcePath).ignore(["*.ts", "*.tsx"]).copy(distPath)
}