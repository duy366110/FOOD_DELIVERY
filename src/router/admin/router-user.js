"use strict"
import { Router } from "express";
const router = Router();

router.get("/", (req, res, next) => {
    return res.status(200).json({staus: true, message: "Router user"});
})

export default router;