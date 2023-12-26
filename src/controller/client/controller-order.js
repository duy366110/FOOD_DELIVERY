"use strict"
import serviceOrder from "../../service/service-order.js";
import configMessage from "../../config/config-message.js";

class ControllerOrder {

    constructor() { }

    /**
     * Client get order by ID.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getOrderForUserById(req, res, next) {
        let { id } = req.params;

        return res.status(200).json({
            status: true,
            message: configMessage.success.order["003"],
            metadata: {
                order: await serviceOrder.getUserOrder(id)
            }
        })
    }

    /**
     * Client add dish to order.
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
     * Client cancel order
     */
    async clientCancelOrder(req, res, next) {
        let { user, order } = req.body;
        let { status, message } = await serviceOrder.clientCancelOrder({user, order});

        if(status) {
            return res.status(200).json({status: true, message});
        } else {
            return res.status(400).json({status: false, message});
        }
    }
}

export default new ControllerOrder();