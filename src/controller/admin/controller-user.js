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
        let status = await serviceUser.createUserAccount({
            fullName, email, password, phone, address
        }, role);

        if(status) {
            return res.status(200).json({status: true, message: "Create user account success"});
        } else {
            return res.status(400).json({status: false, message: "Create user account unsuccess"});
        }
    }
}

export default new ControllerUser();