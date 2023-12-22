"use strict"
import mongoose from "mongoose";
import configDb from "../config/config-db.js";

const Schema = mongoose.Schema;

const modelDish = new Schema({
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
    price: {
        type: Schema.Types.Decimal128,
        default: 0
    },
    thumbs: [
        {
            type: String,
            default: ''
        }
    ],
    category: {
        type: Schema.Types.ObjectId,
        ref: configDb.category
    }
}, {
    collection: configDb.dish,
    timestamps: true
})

export default mongoose.model(configDb.dish, modelDish);