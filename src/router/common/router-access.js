import { Router } from "express";
import controllerAccess from "../../controller/common/controller-access.js";
const router = Router();

router.post("/admin/signin", controllerAccess.adminSignin);
router.post("/admin/signout", controllerAccess.adminSignout);

export default router;