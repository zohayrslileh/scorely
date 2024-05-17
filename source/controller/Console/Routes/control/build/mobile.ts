import Terminal from "@/Tools/Console/Terminal"
import Navigator from "@/Tools/Navigator"
import app from "@/Models/Config/package"

/*
|-----------------------------
|  Mobile builder
|-----------------------------
|
|
*/
export default async function () {

    // Open terminal
    const terminal = new Terminal

    terminal.break.step("Build Mobile").break // New Step

    // Source path
    const sourcePath = "source/mobile"

    // Distribution path
    const distPath = "dist/mobile"

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

    // Make release
    distribution.make("release")
}