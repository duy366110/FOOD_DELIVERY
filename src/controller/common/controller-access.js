"use strict"
import serviceAccess from "../../service/service-access.js";
class ControllerAccess {

    constructor() { }

    /**
     * Admin đăng nhập vào console
     */
    async adminSignin(req, res, next) {
        let { email, password } = req.body;
        await serviceAccess.verifySigninUserAccount({email, password}, (information) => {
            return res.status(200).json(information);
        });
    }

    /**
     * Admin đăng xuất khỏi console
     */
    async adminSignout(req, res, next) {
        let {id, accessToken, refreshToken} = req.body;

        await serviceAccess.verifySignoutUserAccount({id, accessToken, refreshToken}, (information) => {
            let { status } = information;
            if(status) {
                return res.status(200).json({status: true, message: "User signout success"});

            } else {
                return res.status(400).json({status: false, message: "User signout unsuccess"});
            }
        });
    }
}

export default new ControllerAccess();