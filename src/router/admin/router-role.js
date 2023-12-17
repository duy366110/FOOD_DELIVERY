"use strict"
import { Router } from "express";
import controllerRole from "../../controller/admin/controller-role.js";
const router = Router();

router.get("/amount", controllerRole.getRoleAmount);
router.get("/:start/:limit", controllerRole.getRoles);
router.post("/new", controllerRole.createRole);

export default router;