"use strict"
import { Router } from "express";
import controllerTransaction from "../../controller/client/controller-transaction.js";
const router = Router();

router.get("/:id", controllerTransaction.getOrderForUserById);
router.post("/", controllerTransaction.clientTransactionOrder);

export default router;