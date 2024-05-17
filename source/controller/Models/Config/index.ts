import dotenv from "dotenv" // Environment config

/*
|----------------------------------
| Setup .env environment
|----------------------------------
|
|
*/
dotenv.config()

/*
|----------------------------------
| Setup sample.env environment
|----------------------------------
|
|
*/
dotenv.config({ path: "sample.env" })

/*
|----------------------------------
| Define environment config
|----------------------------------
|
|
*/
const config = process.env

/*
|----------------------------------
|  Define Typescript Env
|----------------------------------
|
|
*/
export const TS_ENV = process.execArgv.some(arg => arg.includes("ts-node"))

/*
|----------------------------------
| Define development mode
|----------------------------------
|
|
*/
export const DEV_MODE: boolean = config.NODE_ENV === "development" || TS_ENV

export default config