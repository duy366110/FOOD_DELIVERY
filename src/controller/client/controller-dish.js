" use strict"
import serviceDish from "../../service/service-dish.js";

class ControllerDish {

    constructor() { }

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