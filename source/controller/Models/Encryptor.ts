import { existsSync, readFileSync, writeFileSync } from "fs"
import BaseSigner from "@/Tools/Signer"
import NodeRSA from "node-rsa"

/*
|-----------------------------
|  PRIVATE KEY PATH
|-----------------------------
|
|
*/
export const PRIVATE_KEY_PATH = "storage/private.pem"

// When it exists
if (existsSync(PRIVATE_KEY_PATH)) {

    /*
    |-----------------------------
    |  Create Encryptor
    |-----------------------------
    |
    |
    */
    var Encryptor = new NodeRSA(readFileSync(PRIVATE_KEY_PATH))

}

// When it doesn't exist
else {

    /*
    |-----------------------------
    |  Create Encryptor
    |-----------------------------
    |
    |
    */
    var Encryptor = new NodeRSA({ b: 2048 })

    /*
    |-----------------------------
    |  Save Private Key
    |-----------------------------
    |
    |
    */
    writeFileSync(PRIVATE_KEY_PATH, Encryptor.exportKey("pkcs1-private-pem"))

}

/*
|-----------------------------
|  Create Signer
|-----------------------------
|
|
*/
export const Signer = new BaseSigner(Encryptor)

export default Encryptor