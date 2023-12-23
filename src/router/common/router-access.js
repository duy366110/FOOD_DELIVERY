import { Router } from "express";
import controllerAccess from "../../controller/common/controller-access.js";
const router = Router();

router.post("/signin", controllerAccess.signin);
router.post("/signout", controllerAccess.signout);

router.post("/admin/signin", controllerAccess.adminSignin);
router.post("/admin/signout", controllerAccess.adminSignout);

export default router;