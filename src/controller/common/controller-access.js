"use strict"
import serviceAccess from "../../service/service-access.js";
class ControllerAccess {

    constructor() { }

    /**
     * Admin đăng nhập console
     */
    async adminSignin(req, res, next) {
        let { email, password } = req.body;
        await serviceAccess.verifyUserAccount({email, password}, "Admin", (information) => {
            return res.status(200).json(information);
        });
    }
}

export default new ControllerAccess();