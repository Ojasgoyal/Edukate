import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./auth/auth.routes.js";
import courseRoutes from "./course/course.routes.js";
import enrollRoutes from "./enrollments/enroll.routes.js"
dotenv.config();

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === process.env.CORS_ORIGIN) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-tenant"],
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

app.use((req, res, next) => {
  console.log("req:", req.method, req.url);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll" , enrollRoutes);

app.get("/", (req, res) => {
    res.send("Edukate API running...");
});

app.use((err, req, res, next) => {
    res.status(err.statuscode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export default app
