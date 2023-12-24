"use strict"
import mongoose from "mongoose"
import configDb from "../config/config-db.js";
const Schema = mongoose.Schema;

const modelUser = new Schema({
    fullName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: configDb.role,
        required: true
    },
    order: [
        {
            dish: {
                type: Schema.Types.ObjectId,
                ref: ''
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    collection: configDb.user,
    timestamps: true
})

export default mongoose.model(configDb.user, modelUser);