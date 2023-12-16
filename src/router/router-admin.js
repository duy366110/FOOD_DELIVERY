"use strict"
import { Router } from "express";
import routerUser from "./admin/router-user.js";

const router = Router();

router.use("/user", routerUser);

export default router;