import Terminal from "@/Tools/Console/Terminal"
import Navigator from "@/Tools/Navigator"
import app from "@/Models/Config/package"
import { join } from "path"

/*
|-----------------------------
|  Desktop builder
|-----------------------------
|
|
*/
export default async function () {

    // Open terminal
    const terminal = new Terminal

    terminal.break.step("Build Desktop").break

    // Source path
    const sourcePath = "source/desktop"

    // Distribution path
    const distPath = "dist/desktop"

    // Make source
    const source = new Navigator(sourcePath)

    // Make distribution
    const distribution = new Navigator(distPath, { force: true })

    // Clear distribution
    await distribution.clear()

    // Run build command
    source.execute("npm run build", { VITE_API_VERSION: app.version })

    // Delete source dist directory
    await source.go("dist").delete()

    // Move release
    await source.back().go("src-tauri/target/release/bundle/msi").move(join(distPath, "release"))
}