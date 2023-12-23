"use strict"
import serviceAccess from "../../service/service-access.js";
class ControllerAccess {

    constructor() { }

    /**
     * Admin đăng nhập vào console
     */
    async adminSignin(req, res, next) {
        let { email, password } = req.body;
        await serviceAccess.verifySigninUserAccount({email, password}, 'Admin', (information) => {
            return res.status(200).json(information);
        });
    }

    /**
     * Admin đăng xuất khỏi console
     */
    async adminSignout(req, res, next) {
        let {id, accessToken, refreshToken} = req.body;

        await serviceAccess.verifySignoutUserAccount({id, accessToken, refreshToken}, (information) => {
            return res.status(200).json(information);
        });
    }
}

export default new ControllerAccess();