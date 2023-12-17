"use strict"
import {config} from "dotenv";
import environment from "../environment.js";
config();


const configuration = {
    dev: {
        db: process.env.db_dev,
        origins: environment.origin.dev
    },
    pro: {
        db: process.env.db_pro,
        origins: environment.origin.pro
    }
}

export default configuration[process.env.model];