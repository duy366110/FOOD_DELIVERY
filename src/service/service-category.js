"use strict"
import modelCategory from "../model/model-category.js";
import utilCloudinary from "../utils/util-cloudinary.js";
import config from "../config/config.js";

class ServiceCategory {

    constructor() { }

    /**
     * Get amount category
     */
    async getCategoryAmount() {
        try {
            return await modelCategory.find({}).count();
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
     * Admin truy xuất toàn bộ category hiện có
     * @returns 
     */
    async getAllCategory() {
        try {
            return await modelCategory.find({}).lean();
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Client get all category with dish
     */
    async getAllCategoryWithDish() {
        try {
            return await modelCategory.find({}).populate(['dishs']).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Admin get category theo id
     */
    async getCategoryById(category = "") {
        try {
            return await modelCategory.findById(category).lean();
        } catch(error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin truy xuất category theo ID.
     * @param {*} category 
     * @returns 
     */
    async findCategoryById(category = "") {
        try {
            return await modelCategory.findById(category).exec();
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

    async updateCategory(infor = {category: "", title: "", titleSub: "", desc: ""}, files = []) {
        try {
            let category = await modelCategory.findById(infor.category);

            if(files.length) {
                let photos = [];

                // Thực hiện xoá file cũa và cập nhật file mới
                let thumbs = category.thumbs.map((thumb) => {
                    let image = thumb.split("/").splice(-1)[0].split(".")[0];
                    return `${config.cloudinary.directory}/${image}`;
                })
                await utilCloudinary.destroyMany(thumbs);

                // Thực hiện cập nhật file mới
                photos = files.map((photo) => {
                    return photo.path;
                })
                category.thumbs = [];
                category.thumbs = photos;
            }

            category.title = infor.title;
            category.titleSub = infor.titleSub;
            category.desc = infor.desc;
            return await category.save();

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin thực hiện xoá resource
     * @param {*} category 
     */
    async deleteCategory(category = "") {
        try {
            let categoryInfor = await modelCategory.findById(category);
            let thumbs = [];
            
            thumbs = categoryInfor.thumbs.map((thumb) => {
                let image = thumb.split("/").splice(-1)[0].split(".")[0];
                return `${config.cloudinary.directory}/${image}`;
            })
            await utilCloudinary.destroyMany(thumbs);
            let { deletedCount } =  await categoryInfor.deleteOne();
            return { status: deletedCount? true : false };

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }
}

export default new ServiceCategory();