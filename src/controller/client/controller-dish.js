" use strict"
import serviceDish from "../../service/service-dish.js";

class ControllerDish {

    constructor() { }

    /**
     * Get dish by category id.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getDishByCategoryById(req, res, next) {
        let { category } = req.params;
        return res.status(200).json({
            status: true,
            message: "Get dish success",
            dishs: await serviceDish.getDishByCategoryId(category)
        });
    }

    /**
     * Get dish by ID
     */
    async getDishById(req, res, nect) {
        let { id } = req.params;
        return res.status(200).json({
            status: true,
            message: "Get dish success",
            metadata: {
                dish: await serviceDish.getDishById(id)
            }
        });

    }

}

export default new ControllerDish();