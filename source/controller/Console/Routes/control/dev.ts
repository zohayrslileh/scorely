import { Arguments } from "@/Tools/Console/Router"
import { spawn, spawnSync } from "child_process"
import Terminal from "@/Tools/Console/Terminal"
import tsconfig from "@/Models/Config/tsconfig"
import chokidar from "chokidar"

/*
|-----------------------------
|  Start development
|-----------------------------
|
|
*/
export default async function ({ params }: Arguments) {

    // Open terminal
    const terminal = new Terminal

    // Create watcher
    const watcher = chokidar.watch(tsconfig.compilerOptions.baseUrl, {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 500
        }
    })

    // Watching
    terminal.clear.break.light(`Watching ${tsconfig.compilerOptions.baseUrl} ${params.join(" ")}`,);

    // Create child command
    var child = spawn("ts-node index.js", params, { stdio: "inherit", shell: true })

    // Start Watch
    watcher.on("all", () => {

        // Restart
        terminal.clear.break.light(`Restart ${tsconfig.compilerOptions.baseUrl} ${params.join(" ")}`);

        // Exit old command for windows os
        if (process.platform === "win32") spawnSync(`taskkill`, ["/pid", `${child.pid}`, "/f", "/t"])

        // Exit old command for other OS
        else child.kill()

        // Create new child command
        child = spawn("ts-node index.js", params, { stdio: "inherit", shell: true })

    })
}