import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import config from "./config/index.js";
import tenantRoutes from "./routes/tenant.routes.js";
import authRoutes from "./routes/auth.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import logger from "./utils/logger.js";

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

// rate limiter
const limiter = rateLimit({ windowMs: config.rateLimit.windowMs, max: config.rateLimit.max });
app.use(limiter);

// routes
app.use("/api/tenants", tenantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// health
app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date() }));

// error handler
app.use(errorHandler);

export default app;
