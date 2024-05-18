import { DataSource } from "typeorm"
import migration from "./Migration"
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

export default Object.assign(database, { migration })