import NodeRSA from "node-rsa"

/*
|-----------------------------
|  Signer
|-----------------------------
|
| 
*/
export default class Signer {

    /**
     * Encryptor
     * 
     */
    private encryptor: NodeRSA

    /**
     * Constructor method 
     *
     */
    public constructor(encryptor: NodeRSA) {

        // Set encryptor
        this.encryptor = encryptor
    }

    /**
     * Sign method
     * 
     * @returns
     */
    public sign(payload: any): string {

        // Encode payload
        const encode = btoa(JSON.stringify({ payload }))

        // Sign encode
        const signature = this.encryptor.sign(encode, "base64")

        return `${encode}.${signature}`
    }

    /**
     * Verify method
     * 
     * @returns
     */
    public verify<Payload>(token: string): Payload {

        // Define encode & signature
        const [encode, signature] = token.split(".")

        // Buffer signature
        const bufferSignature = Buffer.from(signature, "base64")

        // Verify signature
        if (!this.encryptor.verify(encode, bufferSignature)) throw new Error("Invalid signature")

        // Get result
        const result = JSON.parse(atob(encode))

        return result.payload
    }
}