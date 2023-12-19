"use strict"
import { Router } from "express";
import controllerUser from "../../controller/admin/controller-user.js";
const router = Router();

router.post("/new", controllerUser.createUserAccount);

export default router;