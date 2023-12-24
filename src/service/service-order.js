"use strict"
import serviceDish from "./service-dish.js";
import serviceAccess from "./service-access.js";

class ServiceOrder {

    constructor() { }

    /**
     * Client add dish to order.
     * @param {*} infor 
     */
    async clientOrderDish(infor = {user: "", dish: ""}) {
        try {
            let dish = await serviceDish.findDishById(infor.dish);
            let access = await serviceAccess.verifyUserAccountWhenOrder({user: infor.user});

            if(access) {
                if(access.user.order && access.user.order.length) {
                    let status = access.user.order.some((order) => order.dish._id.toString() === infor.dish);

                    if(status) {
                        access.user.order = access.user.order.map((order) => {
                            if(order.dish._id.toString() === infor.dish) {
                                order.quantity++;
                            }
                            return order;
                        })

                    } else {
                        access.user.order.push({
                            dish,
                            quantity: 1
                        })
                    }
                } else {
                    access.user.order.push({
                        dish,
                        quantity: 1
                    })
                }
                await access.user.save();
            }
            return {status: true, message: "User order success"};
            
        } catch (error) {
            // METHOD FAILD
            throw error;
        }
    }
}

export default new ServiceOrder();