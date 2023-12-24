"use strict"
import mongoose from "mongoose";
import configDb from "../config/config-db.js";
const Schema = mongoose.Schema;

const modelOrder = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: configDb.user
    },
    orders: [
        {
            dish: {
                type: Schema.Types.ObjectId,
                ref: configDb.dish
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    collection: configDb.order,
    timestamps: true
})

export default mongoose.model(configDb.order, modelOrder);