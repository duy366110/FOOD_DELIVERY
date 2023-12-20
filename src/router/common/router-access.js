import { Router } from "express";
import controllerAccess from "../../controller/common/controller-access.js";
const router = Router();

router.post("/admin/signin", controllerAccess.adminSignin);

export default router;