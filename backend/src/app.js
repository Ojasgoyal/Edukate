import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/auth.routes.js";
import courseRoutes from "./course/course.routes.js";
import enrollRoutes from "./enrollments/enroll.routes.js";
import { getSubdomain } from "./utils.js";
dotenv.config();

const app = express();
const allowedOrigins = process.env.CORS_ORIGINS.split(",");
const RESERVED_SUBDOMAINS = process.env.RESERVED_SUBDOMAINS.split(",");

app.use((req, res, next) => {
  console.log("req:", req.method, req.url);
  next();
});

const corsOptions = {
  origin: [...allowedOrigins, /https:\/\/[a-zA-Z0-9-]+\.edukate\.in$/],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("/*splat", cors(corsOptions));

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollRoutes);

app.get("/", (req, res) => {
  res.send("Edukate API running...");
});

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err); // ADD THIS
  res.status(err.statuscode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
