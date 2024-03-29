"use strict"
import mongoose from "mongoose";
import configDb from "../config/config-db.js";

const Schema = mongoose.Schema;

const modelAccess = new Schema({
    title: {
        type: String,
        default: ""
    },
    titleSub: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        default: ""
    },
    thumbs: [
        {
            type: String,
            default: ''
        }
    ],
    dishs: [
        {
            type: Schema.Types.ObjectId,
            ref: configDb.dish
        }
    ]
}, {
    collection: configDb.category,
    timestamps: true
})

export default mongoose.model(configDb.category, modelAccess);