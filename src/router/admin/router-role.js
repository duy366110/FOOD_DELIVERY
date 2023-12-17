"use strict"
import { Router } from "express";
import controllerRole from "../../controller/admin/controller-role.js";
const router = Router();

router.post("/new", controllerRole.createRole);

export default router;