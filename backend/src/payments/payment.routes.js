import express from "express";
import { createOrder, handleWebhook , verifyPayment } from "./payment.controllers.js";
import {
  extractTenant,
  protect,
  requireTenant,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected route: Frontend MUST send x-tenant header and valid cookies
router.post(
  "/create-order/:courseId",
  extractTenant,
  requireTenant,
  protect,
  createOrder,
);

// Webhook route: No auth middleware, Razorpay handles verification via signature
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);
router.post("/verify", extractTenant, requireTenant, protect, verifyPayment);

export default router;
