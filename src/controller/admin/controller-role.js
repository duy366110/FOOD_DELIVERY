"use strict"
import serviceRole from "../../service/service-role.js";

class ControllerRole {

    constructor() { }

    /**
     * Admin lấy số lượng role hiện có trong database.
     */
    async getRoleAmount(req, res, next) {
        return res.status(200).json({status: true, message: "Get amount success", amount: await serviceRole.getRoleAmount()});
    }

    /**
     * Admin truy cập danh sách role cùng phân trang
     */
    async getRoles(req, res, next) {
        let {start, limit} = req.params;
        return res.status(200).json({
            status: true,
            message: "Get role success",
            roles: await serviceRole.getRoles(start, limit)
        })
    }

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