"use strict"
import serviceUser from "../../service/service-user.js";

class ControllerUser {

    constructor() { }

    /**
     * Admin tạo mới tài khoản người dùng
     */
    async createUserAccount(req, res, next) {
        let { fullName, email, password, phone, address } = req.body;
        console.log(req.body);
        return res.status(200).json({status: true, message: "Create user account success"});
    }
}

export default new ControllerUser();