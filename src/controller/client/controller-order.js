"use strict"
import serviceOrder from "../../service/service-order.js";

class ControllerOrder {

    constructor() { }

    async getOrderForUserById(req, res, next) {
        let { id } = req.params;

        return res.status(200).json({
            status: true,
            message: "Get orders success",
            metadata: {
                order: await serviceOrder.getUserOrder(id)
            }
        })
    }

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
            return res.status(200).json({status: true, message});
        } else {
            return res.status(400).json({status: false, message});
        }
    }

    /**
     * 
     */
    async clientCancelOrder(req, res, next) {
        let { order } = req.body;
        let { status, message } = await serviceOrder.clientCancelOrder({order});

        if(status) {
            return res.status(200).json({status: true, message});
        } else {
            return res.status(400).json({status: false, message});
        }
    }
}

export default new ControllerOrder();