"use strict"
import serviceTransaction from "../../service/service-transaction.js";
import configMessage from "../../config/config-message.js";

class ControllerTransaction {

    constructor() {}

    /**
     * Client get information transaction through ID.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getOrderForUserById(req, res, next) {
        let { id } = req.params;

        return res.status(200).json({
            status: true,
            message: configMessage.success.transaction["002"],
            metadata: {
                transactions: await serviceTransaction.getAllUserTransaction(id)
            }
        })
    }

    /**
     * Client transaction order.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    async clientTransactionOrder(req, res, next) {
        let { user, order } = req.body;
        let transaction = await serviceTransaction.clientTransactionOrder({user, order});

        if(transaction) {
            return res.status(200).json({status: true, message: configMessage.success.transaction["001"]});
        } else {
            return res.status(400).json({status: false, message: configMessage.error.transaction["001"]});
        }
    }
}

export default new ControllerTransaction();