"use strict"
import { Router } from "express";
import config from "../config/config.js";
const router = Router();

router.get("/", (req, res, next) => {
    console.log(config.db);
    return res.status(200).json({status: true, message: "test"});
})

export default router;