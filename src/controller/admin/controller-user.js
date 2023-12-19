"use strict"
import serviceUser from "../../service/service-user.js";

class ControllerUser {

    constructor() { }

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