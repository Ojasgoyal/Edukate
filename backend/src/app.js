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

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

      // ✅ exact matches (main domain etc.)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ✅ check subdomain
      const { host , subdomain } = getSubdomain(origin);

      const isValidTenant =
        subdomain &&
        !RESERVED_SUBDOMAINS.includes(subdomain) &&
        host.endsWith(".edukate.in");

      if (isValidTenant) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-tenant"],
};
app.use(cors(corsOptions));

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
  res.status(err.statuscode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
