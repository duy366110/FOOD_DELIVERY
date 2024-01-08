"use strict"
import { Router } from "express";
import controllerDish from "../../controller/client/controller-dish.js";
const router = Router();

router.get("/category/:category", controllerDish.getDishByCategoryById);
router.get("/:id", controllerDish.getDishById);

export default router;