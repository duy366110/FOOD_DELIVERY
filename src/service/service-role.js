"use strict"
import modelRole from "../model/model-role.js";

class serviceRole {

    constructor() { }

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
}

export default new serviceRole();