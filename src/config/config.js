"use strict"
import {config} from "dotenv";
import environment from "../environment.js";
config();


const configuration = {
    dev: {
        db: process.env.db_dev,
        origins: environment.origin.dev,
        cloudinary: {
            name: process.env.cloudinary_name,
            key: process.env.cloudinary_key,
            secret:  process.env.cloudinary_secret,
            directory: process.env.directory_dev
        }
    },
    pro: {
        db: process.env.db_pro,
        origins: environment.origin.pro,
        cloudinary: {
            name: process.env.cloudinary_name,
            key: process.env.cloudinary_key,
            secret:  process.env.cloudinary_secret,
            directory: process.env.directory_pro
        }
    }
}

export default configuration[process.env.model];