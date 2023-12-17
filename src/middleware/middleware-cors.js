"use strict"
import config from "../config/config.js";

class MiddlewareCors  {

    constructor() { }

    cors = (req, res, next) => {
        let origin = req.get('origin');

        if(config.origins.some((host) => host === origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();

        } else {
            res.status(400).json({status: false, message: 'Corss origin resuce sharing policy from server'});

        }
    }

}

const middlewareCors = new MiddlewareCors();
export default middlewareCors;