"use strict"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 } from "cloudinary";
import config from "../config/config.js";
const cloudinary = v2;



class Cloudinary {

    constructor() {
        cloudinary.config({
            cloud_name: config.cloudinary.name,
            api_key: config.cloudinary.key,
            api_secret: config.cloudinary.secret,
        })
    }

    // UPLOAD FILE LÊN CLOUD
    storage = new CloudinaryStorage({
        cloudinary,
        allowedFormats: ['jpeg', 'jpg', 'png'],
        filename: function (req, file, cb) {
            cb(null, file.originalname); 
        },
        params: {
            folder: config.cloudinary.directory,
        }
    })

    // KIEN TRA FILE TON TAI TREN CLOUD
    async exists(public_id) {
        try {
            let result = await cloudinary.api.resource(public_id);
            return {status: true, result};


        } catch (err) {
            return {status: false, result: null};
        }
    }



    // XOÁ ĐƠN FILE TRÊN CLOUD
    async destroy(path = '') {
        try {
            let status = await cloudinary.api.delete_resources_by_prefix(path);
            return {status: true, message: 'Delete image successfully'};


        } catch (err) {
            return {status: false, message: 'Delete image unsuccessfully'};
        }
    }

    // XOÁ NHIỀU FILE TRÊN CLOUD
    async destroyMany(images = []) {
        try {
            let status = await cloudinary.api.delete_resources(images);
            return { status: true, message: 'Delete many images successfully'};

        } catch (error) {
            return {status: false, message: 'Delete many images unsuccessfully',error};
        }
    }
}

export default new Cloudinary();