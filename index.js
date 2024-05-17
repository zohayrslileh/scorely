
/*
 |---------------------------------------------------------
 |  Define Typescript Environment
 |---------------------------------------------------------
 |  For typescript environment use "npx ts-node index.js"
 |  For javascript environment use "node index.js"
 |
 */
const TS_ENV = process.execArgv.some(argument => argument.includes("ts-node"))

/*
 |-----------------------------
 |  Require Application
 |-----------------------------
 |
 |
 */
const application = require(TS_ENV ? "./source/controller" : "./dist/controller")

application() // Done