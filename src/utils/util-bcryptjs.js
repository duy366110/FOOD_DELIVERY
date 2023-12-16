"use strict"
import { hashSync, compare } from "bcryptjs";

class Bcrypt  {

    salt = 12;

    constructor() {}


    has(password) {
        return hashSync(password, this.salt);
    }

    compare(password, hash, callback) {
        bcrypt.compare(password, hash, (error, data) => {
            if(data) {
                callback({status: true, hash: data});

            } else {
                callback({status: false, hash: null});
                
            }
        })
    }
}

export default new Bcrypt();