"use strict"
import serviceAccess from "../../service/service-access.js";
class ControllerAccess {

    constructor() { }

    /**
     * Client signin
     */
    async signin(req, res, next) {
        let { email, password } = req.body;
        await serviceAccess.verifySigninUserAccount({email, password}, 'Client', (information) => {
            let { status } = information;
            if(status){
                return res.status(200).json(information);
            } else {
                return res.status(400).json(information);
            }
        });
    }

    /**
     * Client signout
     */
    async signout(req, res, next) {
        let {id, accessToken, refreshToken} = req.body;
        await serviceAccess.verifySignoutUserAccount({id, accessToken, refreshToken}, (information) => {
            return res.status(200).json(information);
        });
    }

    /**
     * Client signup account
     */
    async signup(req, res, next) {
        let {fullName, email, password, phone, address} = req.body;
        await serviceAccess.signupUserAccount({fullName, email, password, phone, address}, (information) => {
            return res.status(200).json(information);
        })
    }

    /**
     * Admin signin to console
     */
    async adminSignin(req, res, next) {
        let { email, password } = req.body;
        await serviceAccess.verifySigninUserAccount({email, password}, 'Admin', (information) => {
            return res.status(200).json(information);
        });
    }

    /**
     * Admin signout console
     */
    async adminSignout(req, res, next) {
        let {id, accessToken, refreshToken} = req.body;
        await serviceAccess.verifySignoutUserAccount({id, accessToken, refreshToken}, (information) => {
            return res.status(200).json(information);
        });
    }
}

export default new ControllerAccess();