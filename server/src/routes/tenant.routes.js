import express from "express";
import { registerTenant } from "../controllers/tenant.controller.js";

const router = express.Router();

router.post("/register", registerTenant);

export default router;
