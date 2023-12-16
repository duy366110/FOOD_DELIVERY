"use strict"
import {config} from "dotenv";
config();


const configuration = {
    dev: {
        db: process.env.db_dev
    },
    pro: {
        db: process.env.db_pro
    }
}

export default configuration[process.env.model];