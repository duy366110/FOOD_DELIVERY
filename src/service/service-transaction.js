"use strict"
import modelTransaction from "../model/model-transaction.js";
import serviceOrder from "./service-order.js";

class ServiceTransaction {

    constructor() {}

    /**
     * Client get information transaction through ID.
     * @param {*} user
     * @returns 
     */
    async getAllUserTransaction(user = "") {
        try {
            return await modelTransaction
            .find({user: {$eq: user}})
            .populate([
                {
                    model: 'users',
                    path: 'user'
                },
                {
                    path: 'orders',
                    populate: ([
                        {
                            model: 'dishs',
                            path: "dish"
                        }
                    ])
                }
            ])
            .lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Client transaction order
     * @param {*} infor 
     * @returns 
     */
    async clientTransactionOrder(infor = {user: '', order: ''}) {
        try {
            let order = await serviceOrder.findUserOrderAllInformation(infor.user, infor.order);
            if(order) {
                let transaction = await modelTransaction.create({
                    user: order.user,
                    orders: order.orders
                });
                order.user.order = null;
                order.user.transactions.push(transaction);

                await order.user.save();
                await order.deleteOne();
                return transaction;
            }
            return null;

        } catch (error) {
            throw error;
        }
    }
}

export default new ServiceTransaction();