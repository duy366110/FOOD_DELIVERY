"use strict"
import modelUser from "../model/model.user.js";
import serviceRole from "./service-role.js";
import utilBcrypt from "../utils/util-bcrypt.js";
import configDb from "../config/config-db.js";

class ServiceUser {

    constructor() { }

    /**
     * Admin truy xuất số lượng usẻ với số lượng chỉ định
     */
    async getUsers(start = 0, limit = 10) {
        try {
            return await modelUser
            .find({})
            .sort({createdAt: -1})
            .skip(start)
            .limit(limit)
            .populate([configDb.role])
            .lean();

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    // LẤY DANH SÁCH USER
    // async getAll(cb) {
    //     try {
    //         let users = await ModelUser.find({}).select(['username', 'fullname', 'email', 'phonenumber']).lean();
    //         cb({status: true, message: 'Get users successfully', users});

    //     } catch (error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         cb({status: false, message: 'Method failed', error});
    //     }
    // }

    // TRUY XUẤT USER TỬ THEO ID
    // async getById(id, cb) {
    //     try {
    //         let user = await ModelUser.findById(id).populate(['role']).lean();
    //         cb({status: true, message: 'Get user successfully', user});

    //     } catch (error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         cb({status: false, message: 'Method failed', error});
    //     }
    // }

    /**
     * Admin truy cập số lượng user hiện có
     */
    async getUserAmount() {
        try {
            return await modelUser.find({}).count();
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    // TÌM USER ACCOUNT THEO ID
    // async findByEmail(email, cb) {
    //     try {
    //         let user = await ModelUser.findOne({email: {$eq: email}}).populate(['role']).exec();
    //         cb({status: true, message: 'Find user successfully', user});

    //     } catch (error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         cb({status: false, message: 'Method failed', error});
    //     }
    // }

    /**
     * Admin tạo mới tài khoản người dùng
     */
    async createUserAccount(user = {}, role = "") {
        try {
            let roleInfor = await serviceRole.findRoleById(role);

            let userInfor = await modelUser.create({
                fullName: user.fullName,
                email: user.email,
                password: utilBcrypt.has(user.password),
                phonenumber: user.phonenumber,
                address: user.address,
                role: roleInfor
            });

            if(userInfor) {
                roleInfor.users.push(userInfor);
                await roleInfor.save();
                return true;
            }
            return false;

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    // KHÁCH HÀNG ĐĂNG KÝ TÀI KHOẢN
    // async register(user={}, role = {}, cb) {
    //     try {
    //         let userInfor = await ModelUser.create({
    //             username: user.username,
    //             fullname: user.fullname,
    //             email: user.email,
    //             password: UtilBcrypt.has(user.password),
    //             phonenumber: user.phone,
    //             address: user.address,
    //             role
    //         });

    //         if(userInfor) {
    //             role.users.push(userInfor);
    //             await role.save();
    //             cb({status: true, message: 'Register user successfully', user: userInfor});

    //         } else {
    //             cb({status: false, message: 'Register user unsuccessfully', user: null, error: null});
    //         }

    //     } catch (error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         cb({status: false, message: 'Method failed', error});
    //     }
    // }

    // VERIFY USER THÔNG QUA TOKEN - AUTHENTIZATION
    // async verifyAuthorization(token = '', cb) {
    //     UtilJwt.verify(token.trim(), async (information) => {
    //         let { status, message, infor } = information;
            
    //         if(status && infor) {
    //             let user = await ModelUser.findOne({email: {$eq: infor.email}}).populate(['bookings']).exec();
    //             cb({status: true, message, user});

    //         } else {
    //             // TOKEN KHÔNG HỢP LỆ
    //             cb({status: false, message});
    //         }
    //     })
    // }

    // CẬP NHẬT USER
    // async update(user = {}, role = {}, cb) {
    //     try {

    //         if(role._id.toString() !== user.model.role._id.toString()) {
    //             user.model.role.users = user.model.role.users.filter((userElm) => userElm.toString() !== user.model._id.toString());
    //             user.model.role = role;
    //             role.users.push(user.model);

    //             await user.model.role.save();
    //             await role.save();
    //         }

    //         user.model.username = user.username;
    //         user.model.fullname = user.fullname;
    //         user.model.email = user.email;
    //         user.model.phonenumber = user.phonenumber;
    //         user.model.address = user.address;

    //         await user.model.save();
    //         cb({status: true, message: 'Update user successfully'});


    //     } catch (error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         cb({status: false, message: 'Method failed', error});
    //     }
    // }

    // XOÁ CATEGORY
    // async delete(user = {}, cb) {
    //     try {

    //         user.model.role.users = user.model.role.users.filter((userElm) => userElm.toString() !== user.model._id.toString());
    //         await user.model.role.save();

    //         await user.model.deleteOne();
    //         cb({status: true, message: 'Delete user account successfully'});

    //     } catch (error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         cb({status: false, message: 'Method failed', error});
    //     }
    // }
}

export default new ServiceUser();