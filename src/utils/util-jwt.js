"use strict"
import { sign, verify } from "jsonwebtoken";


class Jwt {

    constructor() { }

    sign(infor = {}, privateKey = '', type = '') {
        return sign({data: infor}, privateKey, { algorithm: 'RS256', expiresIn: type === 'AccessToken'? '3 days' : '7 days'});
    }

    verify(token, publicKey, cb) {
        try {
            let result = verify(token, publicKey, { algorithms: ['RS256']});

            console.log("Result verify token");
            console.log(result);
            cb({status: true});
            
        } catch(error) {
            
            console.log("Error verify token");
            console.log(error);
            cb({status: false});
        }
    }

}

export default new Jwt();