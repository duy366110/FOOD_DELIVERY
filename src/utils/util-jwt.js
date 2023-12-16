"use strict"
import { sign, verify } from "jsonwebtoken";

class JWT {

    serect = 'booking_application_website_366110';

    constructor() { }

    sign(infor = {}, cb) {
        sign(infor, this.serect, { expiresIn: 60 * 60 * 24}, (err, token) => {
            if(err) cb({status: false, message: 'Sign token faile', token: ''});
            cb({status: true, message: 'Sign token successfully', token});
        });
    }

    verify(token = '', cb) {
        verify(token, this.serect, (err, infor) => {
            if(err) cb({status: false, message: err});
            cb({status: true, message: 'verify successfully', infor});
        })
    }
}

const jwt = new JWT();
export default jwt;