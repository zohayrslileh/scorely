import { DataSource } from "typeorm"
import { join } from "path"

/*
|-----------------------------
|  Database
|-----------------------------
|
| 
*/
const database = new DataSource({
    type: "sqlite",
    database: "storage/database.sqlite",
    entities: [join(__dirname, "Entities/*")]
})

/*
|-----------------------------
|  Migration
|-----------------------------
|
| 
*/
const migration = async () => await require("./Migration").default()

export default Object.assign(database, { migration })