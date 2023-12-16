"use strict"
import mongoose from "mongoose";
import config from "../config/config.js";

class Mongodb {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(config.db)
        .then(() => {
            console.log("Connect database sucessully");
        })
        .catch((error) => {
            throw error;

        })
    }

    static getInstance() {
        if(!Mongodb.instance) {
            Mongodb.instance = new Mongodb();
        }
        return Mongodb.instance;
    }
}

const Instance = Mongodb.getInstance();
export default Instance;