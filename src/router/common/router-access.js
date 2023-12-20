import { Router } from "express";
import controllerAccess from "../../controller/common/controller-access.js";
const router = Router();

router.post("/admin/signin", (req, res, next) => {
    return res.status(200).json({status: true, message: "User admin signin success"});
});

export default router;