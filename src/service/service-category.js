"use strict"
import modelCategory from "../model/model-category.js";

class ServiceCategory {

    constructor() { }

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
            throw error;
        }
    }
}

export default new ServiceCategory();