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
     * Admin truy cập role thông qua id
    */
   async getRoleById(req, res, next) {
    let { id } = req.params;
    let roleInfor = await serviceRole.getRoleById(id);
    return res.status(200).json({status: true, message: "Get role success", role: roleInfor});
   }

   /**
     * Admin truy xuất tất của các roles hiện có
     */
   async getAllRole(req, res, next) {
    return res.status(200).json({status: true, message: 'get roles success', roles: await serviceRole.getAllRole()});
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

    /**
     * Admin thực hiên cập nhật role - không rollback
     */
    async updateRole(req, res, next) {
        let { id, name } = req.body;
        let roleInfor = await serviceRole.updateRole({id, name});

        if(roleInfor._id.toString() === id) {
            return res.status(200).json({status: true, message: "Admin update role success"});
        } else {
            return res.status(400).json({status: false, message: "Admin update role unsuccess"});
        }
    }

    
    /**
     * Admin thực hiện xoá role - không rollback
     */
    async destroyRole(req, res, next) {
        let { role } = req.body;
        let roleInfor = await serviceRole.deleteRole({id: role});
        
        if(roleInfor._id.toString() === role) {
            return res.status(200).json({status: true, message: "Admin detroy role success"});
        } else {
            return res.status(400).json({status: false, message: "Admin detroy role unsuccess"});
        }
    }

}

export default new ControllerRole();