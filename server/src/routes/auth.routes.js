import express from "express";
import { login, refresh, verifyEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.get("/verify-email", verifyEmail);

export default router;
