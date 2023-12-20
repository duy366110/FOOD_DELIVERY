"use strict"
import modelAccess from "../model/model-access.js";
import serviceUser from "./service-user.js";
import bcrypt from "../utils/util-bcrypt.js";
import crypto from "../utils/util-crypto.js";
import jwt from "../utils/util-jwt.js";


class ServiceAccess {

    constructor() { }

    async findAccessByUserEmail(email = "") {
        return await modelAccess.findOne({email: {$eq: email}});
    }

    async createAccess(user, publicKey, accessToken, refreshToken) {
        return await modelAccess.create({
            user, email: user.email,
            publicKey,
            accessToken,
            refreshToken,
            status: true
        })
    }

    async verifyAdminAccount(user = {}) {
        let access =  await this.findAccessByUserEmail(user.email);

        let {publicKey, privateKey} = crypto.generateKeyPairSync();
        let accessToken = jwt.sign({id: user.id, email: user.email}, privateKey, "accessToken");
        let refreshToken = jwt.sign({id: user.id, email: user.email}, privateKey, "refreshToken");

        /**
         * Trường hợp user đăng nhập chưa có access
         */
        if(!access) {
            access = await this.createAccess(user, publicKey, accessToken, refreshToken);
            return {
                status: true,
                message: "User signin success",
                metadat: {user, accessToken, refreshToken}
            };

        }

        /**
         * Kiểm tra user account đang hoạt động hay không
         */
        if(access.status) {
            return {status: false, message: "User not signin", metadat: {}};
        }

        access.accessToken = accessToken;
        access.refreshToken =  refreshToken;
        access.publicKey = publicKey;
        access.status = true;
        await access.save();

        return {
            status: true,
            message: "User signin success",
            metadat: {user, accessToken, refreshToken}
        };
    }

    async verifyUserAccount(infor = {email: "", password: ""}, type = "", cb) {
        let user = await serviceUser.findUserByEmail(infor.email);

        if(type === "Admin" && user.role.name === "Admin") {
            /**
             * Kiểm tra passửod người dùng có hợp lệ
             */
            bcrypt.compare(infor.password, user.password, async (information) => {
                let { status } = information;

                if(status) {
                    cb(await this.verifyAdminAccount(user));
                } else {
                    cb({status: false, message: "Password incorrect", metadat: {}});
                }
            })

        }
    }
}

export default new ServiceAccess();