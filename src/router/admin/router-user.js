"use strict"
import { Router } from "express";
import controllerUser from "../../controller/admin/controller-user.js";
const router = Router();

router.get("/amount", controllerUser.getUserAmount);
router.get("/:start/:limit", controllerUser.getUsers);
router.get("/:id", controllerUser.getUserById);
router.post("/new", controllerUser.createUserAccount);
router.post("/update", controllerUser.updateUserAccount);
router.post("/delete", controllerUser.destroyUserAccount);

export default router;