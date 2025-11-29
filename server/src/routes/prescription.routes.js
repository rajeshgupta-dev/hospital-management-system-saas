import express from "express";
import { createPrescription } from "../controllers/prescription.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { tenantMiddleware } from "../middlewares/tenant.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, tenantMiddleware, checkPermission("PRESCRIPTION:CREATE"), createPrescription);

export default router;
