import "./Config" // Setup environment variables 
import Navigator from "@/Tools/Navigator"
import database from "./Database"

/*
|-----------------------------
|  Initialize
|-----------------------------
|
| 
*/
export async function initialize() {

    // Database initialize
    await database.initialize()
}

/*
|-----------------------------
|  Synchronize
|-----------------------------
|
| 
*/
export async function synchronize() {

    // Create navigator
    const navigator = new Navigator

    // Make storage
    navigator.make("storage")

    // Database synchronize
    await database.synchronize()

    // Database migration
    await database.migration()
}