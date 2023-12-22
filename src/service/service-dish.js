"use strict"
import modelDish from "../model/model-dish.js";
import serviceCategory from "./service-category.js";
import utilCloudinary from "../utils/util-cloudinary.js";
import config from "../config/config.js";

class ServiceDish {

    constructor() { }

    /**
     * Get amount dish
     */
    async getDishAmount() {
        try {
            return await modelDish.find({}).count();
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin truy cập danh sách dish cùng phân trang
     */
    async getDishs(start = 0, limit = 10) {
        try {
            return await modelDish.find({}).sort({createdAt: -1}).skip(start).limit(limit).lean();
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin get category theo id
     */
    // async getCategoryById(category = "") {
    //     try {
    //         return await modelCategory.findById(category).lean();
    //     } catch(error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         throw error;
    //     }
    // }

    /**
     * Admin thực hien tạo mới dish
     * @param {*} infor 
     * @param {*} files 
     * @returns 
     */
    async createDish(infor = {title: "", titleSub: "", price: 0, desc: "", category: ""}, files = []) {
        try {
            let photos = [];
            let category = await serviceCategory.findCategoryById(infor.category);

            if(files.length) {
                photos = files.map((photo) => {
                    return photo.path;
                })
            }

            let dish = await modelDish.create({
                title: infor.title,
                titleSub: infor.titleSub,
                price: infor.price,
                desc: infor.desc,
                thumbs: photos,
                category
            })

            category.dishs.push(dish);
            await category.save();
            return dish;

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    // async updateCategory(infor = {category: "", title: "", titleSub: "", desc: ""}, files = []) {
    //     try {
    //         let category = await modelCategory.findById(infor.category);

    //         if(files.length) {
    //             let photos = [];

    //             // Thực hiện xoá file cũa và cập nhật file mới
    //             let thumbs = category.thumbs.map((thumb) => {
    //                 let image = thumb.split("/").splice(-1)[0].split(".")[0];
    //                 return `${config.cloudinary.directory}/${image}`;
    //             })
    //             await utilCloudinary.destroyMany(thumbs);

    //             // Thực hiện cập nhật file mới
    //             photos = files.map((photo) => {
    //                 return photo.path;
    //             })
    //             category.thumbs = [];
    //             category.thumbs = photos;
    //         }

    //         category.title = infor.title;
    //         category.titleSub = infor.titleSub;
    //         category.desc = infor.desc;
    //         return await category.save();

    //     } catch (error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         throw error;
    //     }
    // }

    /**
     * Admin thực hiện xoá resource
     * @param {*} category 
     */
    // async deleteCategory(category = "") {
    //     try {
    //         let categoryInfor = await modelCategory.findById(category);
    //         let thumbs = [];
            
    //         thumbs = categoryInfor.thumbs.map((thumb) => {
    //             let image = thumb.split("/").splice(-1)[0].split(".")[0];
    //             return `${config.cloudinary.directory}/${image}`;
    //         })
    //         await utilCloudinary.destroyMany(thumbs);
    //         let { deletedCount } =  await categoryInfor.deleteOne();
    //         return { status: deletedCount? true : false };

    //     } catch (error) {
    //         // THỰC HIỆN PHƯƠNG THỨC LỖI
    //         throw error;
    //     }
    // }
}

export default new ServiceDish();