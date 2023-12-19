"use strict"
import bcryptjs from 'bcryptjs';
const { hashSync, compare } = bcryptjs;

class Bcrypt  {
    salt = 12;

    constructor() {}

    has(password) {
        return hashSync(password, this.salt);
    }

    compare(password, hash, cb) {
        compare(password, hash, (error, data) => {
            if(data) {
                cb({status: true, hash: data});

            } else {
                cb({status: false, hash: null});
                
            }
        })
    }
}

export default new Bcrypt();