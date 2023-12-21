"use strict"
import { Router } from "express";
const router = Router();

router.post("/new", (req, res, next) => {
    return res.status(200).json({status: true, message: "Create category success"});
})

export default router;