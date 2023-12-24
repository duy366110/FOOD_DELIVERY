"use strict"
import { Router } from "express";
import routerCategory from "./client/router-category.js";
import routerDish from "./client/router-dish.js";
const router = Router();

router.use("/category", routerCategory);
router.use("/dish", routerDish);

export default router;