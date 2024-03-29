"use strict"
import { Router } from "express";
import routerCategory from "./client/router-category.js";
import routerDish from "./client/router-dish.js";
import routerOrder from "./client/router-order.js";
import routerTransaction from "./client/router-transaction.js";
const router = Router();

router.use("/category", routerCategory);
router.use("/dish", routerDish);
router.use("/order", routerOrder);
router.use("/transaction", routerTransaction);

export default router;