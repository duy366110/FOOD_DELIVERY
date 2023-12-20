"use strict"
import { generateKeyPairSync } from "crypto";

class Crypto {

    constructor() { }

    generateKeyPairSync() {
        return generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        })
    }
}

export default new Crypto();