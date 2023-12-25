"use strict"
import { ObjectId } from "mongodb";
import modelOrder from "../model/model-order.js";
import serviceDish from "./service-dish.js";
import serviceAccess from "./service-access.js";

class ServiceOrder {

    constructor() { }

    async getUserOrder(user = "") {
        try {
            return await modelOrder
            .findOne({user: {$eq: user}}, '-password -role')
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
     * Tìm tài thông tin order thông quan user ID.
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

    async createOrUpdateOrderForUser(order = {}, payload = {}) {
        try {
            if(order) {
                let payloadOrder = payload.orders[0].dish;
                let status = order.orders.some((elmOrder) => elmOrder.dish._id.toString() === payloadOrder._id.toString());

                if(status) {
                    order.orders = order.orders.map((elmOrder) => {
                        if(elmOrder.dish._id.toString() === payloadOrder._id.toString()) {
                            elmOrder.quantity++;
                        }
                        return elmOrder;
                    })

                } else {
                    order.orders.push(...payload.orders);
                }

                await order.save();

            } else {
                await modelOrder.create(payload);
            }

            return {status: true, message: "Order success"};

        } catch (error) {
            console.log(error);
            return {status: false, message: "Order unsuccess"};
        }
    }

    /**
     * Client add dish to order.
     * @param {*} infor 
     */
    async clientOrderDish(infor = {user: "", dish: ""}) {
        try {
            let dish = await serviceDish.findDishById(infor.dish);
            let access = await serviceAccess.verifyUserAccountWhenOrder({user: infor.user});

            let order = await this.findOrderByUserID(access.user._id);
            let payload = {
                user: access.user,
                orders: [
                    {
                        dish,
                        quantity: 1
                    }
                ]
            };

            return await this.createOrUpdateOrderForUser(order, payload);
            
        } catch (error) {
            // METHOD FAILD
            throw error;
        }
    }

    async clientCancelOrder(infor = {order: ""}) {
        try {
            let { deletedCount } = await modelOrder.deleteOne({_id: {$eq: infor.order}});
            return {
                status: deletedCount? true : false,
                message: deletedCount? 'Cancel success' : 'Cancel unsuccess'
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new ServiceOrder();