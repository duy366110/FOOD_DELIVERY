"use strict"
import { Router } from "express";
import controllerDish from "../../controller/admin/controller-dish.js";
const router = Router();

router.get("/amount", controllerDish.getDishAmount);
router.get("/:start/:limit", controllerDish.getDishs);
// router.get("/:id", controllerCategory.getCategoryById);
router.post("/new", controllerDish.createDish);
// router.post("/update", controllerCategory.updateCategory);
// router.post("/delete", controllerCategory.deleteCategory);

export default router;