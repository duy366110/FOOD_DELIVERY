"use strict"
import { Router } from "express";
import routerRole from "./admin/router-role.js";
import routerUser from "./admin/router-user.js";

const router = Router();

router.use("/role", routerRole);
router.use("/user", routerUser);

export default router;