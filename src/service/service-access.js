"use strict"
import modelAccess from "../model/model-access.js";
import serviceRole from "./service-role.js";
import serviceUser from "./service-user.js";
import bcrypt from "../utils/util-bcrypt.js";
import crypto from "../utils/util-crypto.js";
import jwt from "../utils/util-jwt.js";
import configMessage from "../config/config-message.js";

class ServiceAccess {

    constructor() { }

    async findAccessByUserEmail(email = "") {
        return await modelAccess.findOne({email: {$eq: email}});
    }

    async findAccessByUserId(id = "") {
        return await modelAccess.findOne({user: {$eq: id}}).exec();
    }

    /**
     * Verify user account when order dish
     */
    async verifyUserAccountWhenOrder(infor = {user: ""}) {
        return await modelAccess
                    .findOne({user: {$eq: infor.user}})
                    .populate([
                        {
                            model: "users",
                            path: 'user',
                        }
                    ])
                    .exec();
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

    async verifyUserAccount(user = {}) {
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
                message: configMessage.success.access['001'],
                metadata: {user, accessToken, refreshToken}
            };

        }

        /**
         * Kiểm tra user account đang hoạt động hay không
         */
        if(access.status) {
            return {status: false, message: configMessage.error.access['001'], metadata: {}};
        }

        access.accessToken = accessToken;
        access.refreshToken =  refreshToken;
        access.publicKey = publicKey;
        access.status = true;
        await access.save();

        return {
            status: true,
            message: configMessage.success.access['001'],
            metadata: {user, accessToken, refreshToken}
        };
    }

    /**
     * 
     * Verify user account signin
     */
    async verifySigninUserAccount(infor = {email: "", password: ""}, type = "", cb) {
        let user = await serviceUser.findUserByEmail(infor.email);

        /**
         * Verify password
         */
        bcrypt.compare(infor.password, user.password, async (information) => {
            let { status } = information;

            if(status) {
                if(type === "Admin") {
                    if(user.role.name === "Admin") {
                        cb(await this.verifyUserAccount(user));

                    } else {
                        cb({status: false, message: configMessage.error.access['004'], metadata: {}});
                    }
                } else {
                    cb(await this.verifyUserAccount(user));
                }
                
            } else {
                cb({status: false, message: configMessage.error.access['002'], metadata: {}});
            }
        })
    }

    /**
     * Client register account
     */
    async signupUserAccount(infor = {fullName: "", email: "", password: "", phone: "", address: ""}, cb) {
        let checkUser = await serviceUser.findUserByEmail(infor.email);

        if(!checkUser) {
            let role = await serviceRole.findRoleByName('Client');
            let {status, user} = await serviceUser.createUserAccount(infor, role._id.toString());

            if(status) {
                cb(await this.verifyUserAccount(user));
            } else {
                cb({
                    status: false,
                    message: configMessage.success.access['001'],
                    metadata: {}
                })
            }
        } else {
            cb({
                status: false,
                message: configMessage.error.access['005'],
                metadata: {}
            })
        }
    }


    /**
     * Verify user account signout
     */
    async verifySignoutUserAccount(infor = {id: "", email: "", accessToken: "", refreshToken: ""}, cb) {
        let access = await this.findAccessByUserId(infor.id);

        jwt.verify(infor.accessToken, access.publicKey, async (information) => {
            let { status } = information;

            if(status) {
                access.tokens.push(access.refreshToken);
                access.publicKey = "";
                access.accessToken = "";
                access.refreshToken = "";
                access.status = false;
                await access.save();
                
                cb({status: true, message: configMessage.success.access['002']});
            } else {
                cb({status: false, message: configMessage.error.access['003']});
            }
        })
    }
}

export default new ServiceAccess();