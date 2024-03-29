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
     * Admin get dish theo id
     */
    async getDishById(dish = "") {
        try {
            return await modelDish.findById(dish).lean();
        } catch(error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }


    /**
     * Client get dish by category id load lazy.
     * @param {*} category 
     * @returns 
     */
    async getDishByCategoryId(category = "") {
        try {

            return await modelDish.find({
                category: {
                    $eq: category
                }
            })

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Find dish by ID.
     */
    async findDishById(id ="") {
        try {
            return await modelDish.findById(id).exec();

        } catch (error) {
            throw error;
        }
    }

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


    /**
     * Admin thực hiện cập nhật dish
     * @param {*} infor 
     * @param {*} files 
     */
    async updateDish(infor = {dish: "", title: "", titleSub: "", price: 0, desc: "", category: ""}, files = []) {
        try {
            let dish = await modelDish.findById(infor.dish).populate(['category']).exec();

            if(dish.category._id.toString() !== infor.category) {
                // Xoa category cu
                dish.category.dishs = dish.category.dishs.filter((dishCategory) => dishCategory.toString() !== dish._id.toString());

                // Cap nhat category moi
                let category = await serviceCategory.findCategoryById(infor.category);
                category.dishs.push(dish);
                await category.save();

                dish.category = category;
            }

            if(files.length) {
                let photos = [];
                // Thực hiện xoá file cũa và cập nhật file mới
                let thumbs = dish.thumbs.map((thumb) => {
                    let image = thumb.split("/").splice(-1)[0].split(".")[0];
                    return `${config.cloudinary.directory}/${image}`;
                })
                await utilCloudinary.destroyMany(thumbs);

                // Thực hiện cập nhật file mới
                photos = files.map((photo) => {
                    return photo.path;
                })
                dish.thumbs = [];
                dish.thumbs = photos;
            }

            dish.title = infor.title;
            dish.titleSub = infor.titleSub;
            dish.desc = infor.desc;
            dish.price = infor.price;
            return await dish.save();

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }

    /**
     * Admin thực hiện xoá resource
     * @param {*} category 
     */
    async deleteDish(dish = "") {
        try {
            let dishInfor = await modelDish.findById(dish);
            let thumbs = [];
            
            thumbs = dishInfor.thumbs.map((thumb) => {
                let image = thumb.split("/").splice(-1)[0].split(".")[0];
                return `${config.cloudinary.directory}/${image}`;
            })
            await utilCloudinary.destroyMany(thumbs);
            let { deletedCount } =  await dishInfor.deleteOne();
            return { status: deletedCount? true : false };

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            throw error;
        }
    }
}

export default new ServiceDish();