"use strict"
import { Router } from "express";
import routerCategory from "./client/rouetr-category.js";
const router = Router();

router.use("/category", routerCategory);

export default router;