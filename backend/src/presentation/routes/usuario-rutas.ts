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
router.get("/refresh", refreshHandler);
router.post("/logout", logoutHandler);
router.post("/cambiar-contrasena/:id", authMiddleware, changePasswordHandler);

export default router;