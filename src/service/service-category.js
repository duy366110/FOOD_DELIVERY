"use strict"
import modelCategory from "../model/model-category.js";

class ServiceCategory {

    constructor() { }

    /**
     * Get amount category
     */
    async getCategoryAmount() {
        try {
            return await modelCategory.find({}).countDocuments();
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin truy cập danh sách categories cùng phân trang
     */
    async getCategories(start = 0, limit = 10) {
        try {
            return await modelCategory.find({}).sort({createdAt: -1}).skip(start).limit(limit).lean();
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin thực hien tạo mới category
     * @param {*} infor 
     * @param {*} files 
     * @returns 
     */
    async createCategory(infor = {title: "", titleSub: "", desc: ""}, files = []) {
        try {
            let photos = [];
            if(files.length) {
                photos = files.map((photo) => {
                    return photo.path;
                })
            }

            return await modelCategory.create({
                title: infor.title,
                titleSub: infor.titleSub,
                desc: infor.desc,
                thumbs: photos
            })

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }
}

export default new ServiceCategory();