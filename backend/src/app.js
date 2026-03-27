import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./auth/auth.routes.js";
import courseRoutes from "./course/course.routes.js";
import enrollRoutes from "./enrollments/enroll.routes.js"

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-tenant"],
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll" , enrollRoutes)

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
