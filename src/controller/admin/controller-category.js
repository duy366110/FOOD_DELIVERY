"use strict"
import serviceCategory from "../../service/service-category.js";

class ControllerCategory {

    constructor() {}

    /**
     * Admin tạo mới category
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createCategory(req, res, next) {
        let { title, titleSub, desc } = req.body;
        let category = await serviceCategory.createCategory({title, titleSub, desc}, req.files);
        if(category) {
            return res.status(200).json({status: true, message: "Create category success"});
            
        } else {
            return res.status(400).json({status: false, message: "Create category unsuccess"});
        }
    }
}

export default new ControllerCategory();