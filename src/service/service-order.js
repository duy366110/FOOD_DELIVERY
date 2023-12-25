"use strict"
import modelOrder from "../model/model-order.js";
import serviceDish from "./service-dish.js";
import serviceAccess from "./service-access.js";
import serviceUser from "./service-user.js";

class ServiceOrder {

    constructor() { }

    /**
     * Client get information order through ID.
     * @param {*} user 
     * @returns 
     */
    async getUserOrder(user = "") {
        try {
            return await modelOrder
            .findOne({user: {$eq: user}})
            .populate([
                {
                    model: "users",
                    path: "user",
                },
                {
                    path: 'orders',
                    populate: [
                        {
                            model: 'dishs',
                            path: 'dish'
                        }
                    ]
                }
            ])
            .lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find order information with order - user - dish
     * @param {*} user 
     * @param {*} order 
     * @returns 
     */
    async findUserOrderAllInformation(user = "", order = "") {
        try {
            return await modelOrder
            .findOne({_id: {$eq: order},user: {$eq: user}})
            .populate([
                {
                    model: "users",
                    path: "user",
                },
                {
                    path: 'orders',
                    populate: [
                        {
                            model: 'dishs',
                            path: 'dish'
                        }
                    ]
                }
            ])
            .exec();

        } catch (error) {
            throw error;
        }
    }

    /**
     * Find order through user.
     * @param {*} user 
     */
    async findOrderByUserID(user = "") {
        try {
            return await modelOrder
            .findOne({user: {$eq: user}})
            .populate([
                {
                    path: 'orders',
                    populate: [
                        {
                            model: 'dishs',
                            path: 'dish'
                        }
                    ]
                }
            ])
            .exec();
        } catch (error) {
            throw error;
        }
    }


    /**
     * Create - update order
     * @param {*} order 
     * @param {*} payload 
     * @returns 
     */
    async createOrUpdateOrderForUser(user = {}, order = {}, payload = {}) {
        try {
            let orderInfor = null;
            // Check order exists
            if(order) {
                // Check dish exists in order
                let payloadOrder = payload.orders[0].dish;
                let status = order.orders.some((elmOrder) => elmOrder.dish._id.toString() === payloadOrder._id.toString());

                if(status) {
                    // Increment quantity dish in order
                    order.orders = order.orders.map((elmOrder) => {
                        if(elmOrder.dish._id.toString() === payloadOrder._id.toString()) {
                            elmOrder.quantity++;
                        }
                        return elmOrder;
                    })
                } else {
                    // Add new dish to order
                    order.orders.push(...payload.orders);
                }
                await order.save();

            } else {
                // Add new dish to order
                orderInfor = await modelOrder.create(payload);
                user.order = orderInfor;
                await user.save();
            }

            return orderInfor

        } catch (error) {
            throw error;
        }
    }

    /**
     * Client add dish to order.
     */
    async clientOrderDish(infor = {user: "", dish: ""}) {
        try {
            let dish = await serviceDish.findDishById(infor.dish);
            let user = await serviceUser.findUserById(infor.user);

            if(user) {
                let order = await this.findOrderByUserID(user._id);
                let payload = {
                    user: user,
                    orders: [
                        {
                            dish,
                            quantity: 1
                        }
                    ]
                };

                let orderInfor = await this.createOrUpdateOrderForUser(user, order, payload);

                return {
                    status: orderInfor? true : false,
                    message: orderInfor? "Order success" : "Order unsuccess"
                }
            }
            return {status: false, message: "Not found user account"};

        } catch (error) {
            // METHOD FAILD
            throw error;
        }
    }

    /**
     * Client cancel order.
     * @param {*} infor
     * @returns 
     */
    async clientCancelOrder(infor = {user: "", order: ""}) {
        try {
            let order = await this.findUserOrderAllInformation(infor.user, infor.order);

            if(order) {
                order.user.order = null;
                await order.user.save();
                let { deletedCount } = await order.deleteOne();

                return {
                    status: deletedCount? true : false,
                    message: deletedCount? 'Cancel success' : 'Cancel unsuccess'
                }

            } else {
                return {status: false, message: 'Cancel order unsuccess'};
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new ServiceOrder();