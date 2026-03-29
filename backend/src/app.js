import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/auth.routes.js";
import courseRoutes from "./course/course.routes.js";
import enrollRoutes from "./enrollments/enroll.routes.js";
dotenv.config();

const app = express();
const allowedOrigin = process.env.CORS_ORIGIN
const RESERVED_SUBDOMAINS = process.env.RESERVED_SUBDOMAINS.split(",");

app.use((req, res, next) => {
  console.log("req:", req.method, req.url);
  next();
});

app.use(cors({
  origin: /^https:\/\/(.*\.)?edukate\.in$/,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With","x-tenant"]
}));

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(async (req, res, next) => {
  await connectDB();
  console.log("✅ MongoDB Connected (Middleware)");
  next();
});

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
