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
            .populate(["role"])
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

    /**
     * Admin truy cập user thông qua id
    */
    async getUserById(id) {
        try {
            return await modelUser.findById(id).populate(['role']).lean();
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin truy xuất user account thông qua id
     */

    async findUserById(id = "") {
        try {
            return await modelUser.findById(id).populate(['role']).exec();
        } catch (error) {
            throw error
        }
    }

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
                phone: user.phone,
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

    /**
     * Admin thực hiên cập nhật user - không rollback
     */
    async updateUserAccount(user = {}, role = "") {
        try {

            let userInfor = await modelUser.findById(user.id).populate(['role']).exec();

            if(userInfor.role._id.toString() !== role) {
                let roleNew = await serviceRole.findRoleById(role);

                userInfor.role.users = userInfor.role.users.filter((userRole) => userRole.toString() !== user.id);
                await userInfor.role.save();

                roleNew.users.push(userInfor);
                await roleNew.save();

                userInfor.role = roleNew;
            }

            userInfor.fullName = user.fullName;
            userInfor.email = user.email;
            userInfor.phone = user.phone;
            userInfor.address = user.address;
            let result = await userInfor.updateOne();
            console.log(result);

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin thực hiện xoá user account không rollback
     */
    async destroyUserAccount(user = {}, cb) {
        try {
            let userInfor = await modelUser.findById(user.id).populate(['role']).exec();
            userInfor.role.users =  userInfor.role.users.filter((userRef) => userRef.toString() !== user.id);
            await userInfor.role.save();

            let { acknowledged, deletedCount } = await userInfor.deleteOne();
            return deletedCount? true : false;

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }
}

export default new ServiceUser();