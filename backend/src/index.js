import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Only run app.listen locally. Vercel ignores this anyway!
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

// Vercel grabs this export directly
export default app;