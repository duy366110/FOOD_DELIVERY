"use strict"
import serviceUser from "../../service/service-user.js";

class ControllerUser {

    constructor() { }

    /**
     * Admin lấy số lượng user hiện có.
     */
    async getUserAmount(req, res, next) {
        return res.status(200).json({
            status: true,
            message: "Get amount success",
            amount: await serviceUser.getUserAmount()
        });
    }

     /**
     * Admin truy cập user thông qua id
    */
     async getUserById(req, res, next) {
        let { id } = req.params;
        let userInfor = await serviceUser.getUserById(id);
        return res.status(200).json({status: true, message: "Get user success", user: userInfor});
    }

    /**
     * Admin truy cập danh sách user cùng phân trang
     */
    async getUsers(req, res, next) {
        let {start, limit} = req.params;
        let users = await serviceUser.getUsers(start, limit);
        
        return res.status(200).json({
            status: true,
            message: "Get user success",
            users: users
        })
    }

    /**
     * Admin tạo mới tài khoản người dùng
     */
    async createUserAccount(req, res, next) {
        let { fullName, email, password, phone, address, role } = req.body;
        let { status } = await serviceUser.createUserAccount({
            fullName, email, password, phone, address
        }, role);

        if(status) {
            return res.status(200).json({status: true, message: "Create user account success"});
        } else {
            return res.status(400).json({status: false, message: "Create user account unsuccess"});
        }
    }

    /**
     * Admin thực hiên cập nhật user - không rollback
     */
    async updateUserAccount(req, res, next) {
        let { id, fullName, email, phone, address, role } = req.body;
        let user = await serviceUser.updateUserAccount({id, fullName, email, phone, address}, role);

        if(user) {
            return res.status(200).json({status: true, message: "Admin update role success"});

        } else {
            return res.status(400).json({status: false, message: "Admin update role unsuccess"});
        }
    }

    /**
     * Admin thực hiện xoá user account không rollback
     */
    async destroyUserAccount(req, res, next) {
        let { user } = req.body;
        let status = await serviceUser.destroyUserAccount({id: user});
        
        if(status) {
            return res.status(200).json({status: true, message: "Destroy user account success"});
            
        } else {
            return res.status(400).json({status: false, message: "Destroy user account unsuccess"});
        }
    }
}

export default new ControllerUser();