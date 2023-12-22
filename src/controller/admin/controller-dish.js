"use strict"
import serviceDish from "../../service/service-dish.js";

class ControllerCategory {

    constructor() {}

    /**
     * Truy cập số lượng dish
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getDishAmount(req, res, next) {
        let amount = await serviceDish.getDishAmount();
        return res.status(200).json({status: true, message: "Get dish amount", amount})
    }

    /**
     * Admin truy cập danh sách dish cùng phân trang
     */
    async getDishs(req, res, next) {
        let {start, limit} = req.params;

        return res.status(200).json({
            status: true,
            message: "Get dish success",
            dishs: await serviceDish.getDishs(start, limit)
        })
    }

    /**
     * Admin truy cập category thông qua ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    // async getCategoryById(req, res, next) {
    //     let { id } = req.params;
    //     return res.status(200).json({
    //         status: true,
    //         message: 'Get category success',
    //         category: await serviceCategory.getCategoryById(id),
    //     })
    // }

    /**
     * Admin tạo mới dish
     * @param {*} req
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createDish(req, res, next) {
        let { title, titleSub, desc, price, category } = req.body;
        let dish = await serviceDish.createDish({title, titleSub, price, desc, category}, req.files);
        if(dish) {
            return res.status(200).json({status: true, message: "Create dish success"});

        } else {
            return res.status(400).json({status: false, message: "Create dish unsuccess"});
        }
    }

    /**
     * Admin cập nhật thông tin category
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    // async updateCategory(req, res, next) {
    //     let {category, title, titleSub, desc } = req.body;
    //     let categoryInfor = await serviceCategory.updateCategory({category, title, titleSub, desc}, req.files);
        
    //     if(categoryInfor) {
    //         return res.status(200).json({status: true, message: "Update category success"});

    //     } else {
    //         return res.status(400).json({status: false, message: "Update category unsuccess"});
    //     }
    // }

    /**
     * Admin xoá resource category
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    // async deleteCategory(req, res, next) {
    //     let { category } = req.body;
    //     let { status } = await serviceCategory.deleteCategory(category);
        
    //     if(status) {
    //         return res.status(200).json({status: true, message: "Delete categogy success"});
    //     } else {
    //         return res.status(400).json({status: false, message: "Delete categogy unsuccess"});
    //     }
    // }
}

export default new ControllerCategory();