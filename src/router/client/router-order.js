"use strict"
import { Router } from "express";
import controllerOrder from "../../controller/client/controller-order.js";
const router = Router();

router.get("/:id", controllerOrder.getOrderForUserById);
router.post("/dish", controllerOrder.clientOrderDish);

export default router;