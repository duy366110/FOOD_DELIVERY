"use strict"
import { Router } from "express";
import controllerCategory from "../../controller/client/controller-category.js";
const router = Router();

router.get("/", controllerCategory.getAllCategory);

export default router;