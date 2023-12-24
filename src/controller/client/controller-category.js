"use strict"
import serviceCategory from "../../service/service-category.js";

class ControllerCategory {

    constructor() {}

    async getAllCategory(req, res, next) {
        return res.status(200).json({
            status: true,
            message: "Get category with dish",
            metadata: {
                categories: await serviceCategory.getAllCategoryWithDish()
            }
        })
    }
}

export default new ControllerCategory();