"use strict"
import { Router } from "express";
import controllerCategory from "../../controller/admin/controller-category.js";
const router = Router();

router.post("/new", controllerCategory.createCategory);

export default router;