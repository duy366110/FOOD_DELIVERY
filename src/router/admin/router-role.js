"use strict"
import { Router } from "express";
import controllerRole from "../../controller/admin/controller-role.js";
const router = Router();

router.get("/amount", controllerRole.getRoleAmount);
router.get("/:start/:limit", controllerRole.getRoles);
router.get("/:id", controllerRole.getRoleById);
router.post("/new",
[
    body('name').custom((value, {req}) => {
        if(!value) throw Error('Name role not empty');
        return true;
    }),
],
controllerRole.createRole);
router.post("/update", controllerRole.updateRole);
router.post("/delete", controllerRole.destroyRole);

export default router;