"use strict"
import { Router } from "express";
import controllerOrder from "../../controller/client/controller-order.js";
const router = Router();

router.get("/:id", controllerOrder.getOrderForUserById);
router.post("/dish", controllerOrder.clientOrderDish);
router.post("/cancel", controllerOrder.clientCancelOrder);

export default router;