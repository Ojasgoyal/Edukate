import dotenv from "dotenv";
import connectDB from "./db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// ✅ connect once at startup (important for localhost)
connectDB()
  .then(() => {
    console.log("✅ DB ready at startup");

    // ✅ only start server locally
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

export default app;