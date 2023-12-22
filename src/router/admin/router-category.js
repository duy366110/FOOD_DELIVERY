"use strict"
import { Router } from "express";
import controllerCategory from "../../controller/admin/controller-category.js";
const router = Router();

router.get("/amount", controllerCategory.getCategoryAmount);
router.get("/:start/:limit", controllerCategory.getCategories);
router.post("/new", controllerCategory.createCategory);
router.post("/delete", controllerCategory.deleteCategory);

export default router;