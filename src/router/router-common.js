"use strict"
import { Router } from "express";
import routerAccess from "./common/router-access.js";
const router = Router();

router.use("/access", routerAccess);

export default router;