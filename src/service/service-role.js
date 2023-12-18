"use strict"
import modelRole from "../model/model-role.js";

class serviceRole {

    constructor() { }

    /**
     * Lấy số lượng role hiện có trong database
     */
    async getRoleAmount() {
        try {
            return await modelRole.find({}).count();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Admin truy cập danh sách role cùng phân trang
     */
    async getRoles(start = 0, limit = 10) {
        try {
            return await modelRole.find({}).sort({createdAt: -1}).skip(start).limit(limit).lean();
        } catch (error) {
            throw error;
        }
    }

    // LẤY DANH SÁCH ROLE
    async getAll(cb) {
        try {
            let roles = await ModelRole.find({}).lean();
            cb({status: true, message: 'Get roles successfully', roles});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // TRUY XUẤT ROLE TỬ THEO ID
    async getById(id, cb) {
        try {
            let role = await ModelRole.findById(id).lean();
            cb({status: true, message: 'Get role successfully', role});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    /**
     * Kiểm tra role đã tồn tại hay chưa
     * @param {*} nameRole 
     * @returns 
     */
    async existsRole(nameRole = '') {
        try {
            return await modelRole.findOne({name: {$eq: nameRole}}).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Admin tạo mới role
     */
    async createRole(role = {name: ""}) {
        try {
            let roleExists = await this.existsRole(role.name);
            if(!roleExists) {
                return await modelRole.create(role);
            }
            return false;

        } catch (error) {
            throw error;
        }
    }

    // CẬP NHẬT ROLE
    async update(role = {}, cb) {
        try {
            role.model.name = role.name;

            await role.model.save();
            cb({status: true, message: 'Update role successfully'});


        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    /**
     * Admin thực hiện xoá role - không rollback
     * @param {*} role 
     * @param {*} cb 
     */
    async deleteRole(role = {id: ""}) {
        try {
            return await modelRole.findOneAndDelete({_id: {$eq: role.id}});
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }
}

export default new serviceRole();