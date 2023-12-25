"use strict"
import { Router } from "express";
import controllerTransaction from "../../controller/client/controller-transaction.js";
const router = Router();

router.post("/", controllerTransaction.clientTransactionOrder);

export default router;