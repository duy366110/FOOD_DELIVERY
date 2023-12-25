"use strict"
import serviceTransaction from "../../service/service-transaction.js";

class ControllerTransaction {

    constructor() {}

    async getOrderForUserById(req, res, next) {
        let { id } = req.params;

        return res.status(200).json({
            status: true,
            message: "Get transactions success",
            metadata: {
                transactions: await serviceTransaction.findAllUserTransaction(id)
            }
        })
    }

    /**
     * Client transaction order
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async clientTransactionOrder(req, res, next) {
        let { user, order } = req.body;
        let transaction = await serviceTransaction.clientTransactionOrder({user, order});

        if(transaction) {
            return res.status(200).json({status: true, message: "Client transaction success"});
        } else {
            return res.status(400).json({status: false, message: "Client transaction unsuccess"});
        }
    }
}

export default new ControllerTransaction();