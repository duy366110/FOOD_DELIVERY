"use strict"
import serviceCategory from "../../service/service-category.js";

class ControllerCategory {

    constructor() {}

    /**
     * Truy cập số lượng category
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getCategoryAmount(req, res, next) {
        let amount = await serviceCategory.getCategoryAmount();
        return res.status(200).json({status: true, message: "Get actegory amount", amount})
    }

    /**
     * Admin truy cập danh sách category cùng phân trang
     */
    async getCategories(req, res, next) {
        let {start, limit} = req.params;

        return res.status(200).json({
            status: true,
            message: "Get categories success",
            categories: await serviceCategory.getCategories(start, limit)
        })
    }

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

    /**
     * Admin xoá resource category
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteCategory(req, res, next) {
        let { category } = req.body;
        let { status } = await serviceCategory.deleteCategory(category);
        
        if(status) {
            return res.status(200).json({status: true, message: "Delete categogy success"});
        } else {
            return res.status(400).json({status: false, message: "Delete categogy unsuccess"});
        }
    }
}

export default new ControllerCategory();