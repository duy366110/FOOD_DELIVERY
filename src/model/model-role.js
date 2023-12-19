import mongoose from "mongoose";
import configDB from "../config/config-db.js";
const Schema = mongoose.Schema;

const modelRole = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: configDB.user
        }
    ]
}, {
    collection: configDB.role,
    timestamps: true
})

export default mongoose.model(configDB.role, modelRole);