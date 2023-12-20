"use strict"
import mongoose from "mongoose";
import configDb from "../config/config-db.js";

const Schema = mongoose.Schema;

const modelAccess = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: configDb.user
    },
    email: {
        type: String,
        default: ""
    },
    tokens: {
        type: Array,
        default: []
    },
    accessToken: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        enum: [false, true],
        default: false
    }
}, {
    collection: configDb.access,
    timestamps: true
})

export default mongoose.model(configDb.access, modelAccess);