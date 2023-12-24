"use strict"
import serviceOrder from "../../service/service-order.js";

class ControllerOrder {

    constructor() { }


    /**
     * Client add dish to order
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async clientOrderDish(req, res, next) {
        let { user, dish } = req.body;

        let { status, message } = await serviceOrder.clientOrderDish({user, dish});
        
        if(status) {
            return res.status(200).json({status: true, message: "User order success"});
        } else {
            return res.status(200).json({status: false, message: "User order unsuccess"});
        }
    }
}

export default new ControllerOrder();