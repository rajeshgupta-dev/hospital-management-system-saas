import express from "express";
import { createPatient, listPatients } from "../controllers/patient.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { tenantMiddleware } from "../middlewares/tenant.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, tenantMiddleware, checkPermission("PATIENT:CREATE"), createPatient);
router.get("/", authMiddleware, tenantMiddleware, checkPermission("PATIENT:READ"), listPatients);

export default router;
