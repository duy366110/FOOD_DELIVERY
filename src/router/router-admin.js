"use strict"
import { Router } from "express";
import routerRole from "./admin/router-role.js";
import routerUser from "./admin/router-user.js";
import routerCategory from "./admin/router-category.js";
import routerDish from "./admin/router-dish.js";

const router = Router();

router.use("/role", routerRole);
router.use("/user", routerUser);
router.use("/category", routerCategory);
router.use("/dish", routerDish);


export default router;