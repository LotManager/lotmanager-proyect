import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  refreshHandler,
  logoutHandler,
  changePasswordHandler
} from "../../presentation/controllers/auth-controller";
import { authMiddleware } from "../../presentation/middlewares/authmiddleware";


const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);
router.patch("/cambiar-contrasena/:id", authMiddleware, changePasswordHandler);

export default router;