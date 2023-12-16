"use strict"
import {config} from "dotenv";
config();


const configuration = {
    dev: {
        db: "dev"
    },
    pro: {
        db: "pro"
    }
}

export default configuration[process.env.model];