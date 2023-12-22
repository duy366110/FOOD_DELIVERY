"use strict"
import { Router } from "express";
import controllerDish from "../../controller/admin/controller-dish.js";
const router = Router();

router.get("/amount", controllerDish.getDishAmount);
router.get("/:start/:limit", controllerDish.getDishs);
router.get("/:id", controllerDish.getDishById);
router.post("/new", controllerDish.createDish);
router.post("/update", controllerDish.updateDish);
router.post("/delete", controllerDish.deleteDish);

export default router;