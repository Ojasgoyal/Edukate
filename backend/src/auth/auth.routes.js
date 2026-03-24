import { Router } from "express";
import { login, register , logout } from "./auth.controllers.js";
import { checkTenantAccess, protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, checkTenantAccess, (req, res) => {
  res.json({
    user: req.user,
    tenant: req.tenant,
  });
});

router.post("/logout", protect ,logout);

export default router;
