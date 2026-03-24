import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

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