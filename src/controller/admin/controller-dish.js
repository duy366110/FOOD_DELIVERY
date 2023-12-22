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
     * Admin truy cập dish thông qua ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getDishById(req, res, next) {
        let { id } = req.params;
        return res.status(200).json({
            status: true,
            message: 'Get dish success',
            dish: await serviceDish.getDishById(id),
        })
    }

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
     * Admin cập nhật thông tin dish
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async updateDish(req, res, next) {
        let { dish, title, titleSub, desc, price, category } = req.body;
         let dishInfor = await serviceDish.updateDish({dish, title, titleSub, price, desc, category}, req.files);

        if(dishInfor) {
            return res.status(200).json({status: true, message: "Create dish success"});

        } else {
            return res.status(400).json({status: false, message: "Create dish unsuccess"});
        }
    }

    /**
     * Admin xoá resource dish
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteDish(req, res, next) {
        let { dish } = req.body;
        let { status } = await serviceDish.deleteDish(dish);
        
        if(status) {
            return res.status(200).json({status: true, message: "Delete dish success"});
        } else {
            return res.status(400).json({status: false, message: "Delete dish unsuccess"});
        }
    }
}

export default new ControllerCategory();