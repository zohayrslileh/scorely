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

export default database