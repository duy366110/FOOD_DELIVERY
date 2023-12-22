"use strict"
import { Router } from "express";
import controllerDish from "../../controller/admin/controller-dish.js";
const router = Router();

// router.get("/amount", controllerCategory.getCategoryAmount);
// router.get("/:start/:limit", controllerCategory.getCategories);
// router.get("/:id", controllerCategory.getCategoryById);
router.post("/new", controllerDish.createDish);
// router.post("/update", controllerCategory.updateCategory);
// router.post("/delete", controllerCategory.deleteCategory);

export default router;