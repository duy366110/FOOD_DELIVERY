"use strict"
import serviceRole from "../../service/service-role.js";

class ControllerRole {

    constructor() { }

    /**
     * Admin tạo mới role
     */
    async createRole(req, res, next) {
        let { name } = req.body;
        let role = await serviceRole.createRole({name});

        if(role) {
            return res.status(200).json({status: true, message: "Create role success"});
            
        } else {
            return res.status(400).json({status: false, message: "Create role unsuccess"});
        }
    }

}

export default new ControllerRole();