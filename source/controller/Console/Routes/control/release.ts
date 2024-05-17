import app, { Package } from "@/Models/Config/package"
import { Arguments } from "@/Tools/Console/Router"
import Terminal from "@/Tools/Console/Terminal"
import xaelion from "@/Models/Config/xaelion"
import Navigator from "@/Tools/Navigator"
import Json from "@/Tools/Json"
import { join } from "path"

/*
|-----------------------------
|  Release
|-----------------------------
|
|
*/
export default async function ({ flags }: Arguments) {

    // Open terminal
    const terminal = new Terminal

    // Release path
    const releasePath = join("release", app.version)

    // Make distribution directory and clear
    await new Navigator(releasePath, { force: true }).clear()

    // Copy new
    await new Navigator().ignore([
        ...xaelion.devPaths,
        ...xaelion.localPaths,
        ...xaelion.renewablePaths
    ]).copy(releasePath)

    // Remove dev data from package
    new Json<Package>(join(releasePath, "package.json")).update(old => ({
        ...old,
        devDependencies: undefined,
        scripts: old.proScripts,
        proScripts: undefined
    }))

    // Copy dependencies
    if (app.dependencies && flags.withDeps) terminal.execute("npm install --prefer-offline --no-package-lock", releasePath)

    // Compress
    await new Navigator(releasePath).compress(join("release", `${app.name}@${app.version}.zip`))

    // Delete release folder
    await new Navigator(releasePath).delete()
}