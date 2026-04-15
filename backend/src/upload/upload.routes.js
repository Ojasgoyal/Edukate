import { Router } from "express";
import { upload, deleteImageFromCloudinary } from "../middlewares/upload.middleware.js";
import { protect, teacherOnly } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protect, teacherOnly, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Check if the frontend sent an old image URL to replace
    const { oldImageUrl } = req.body;
    if (oldImageUrl) {
      await deleteImageFromCloudinary(oldImageUrl);
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.path, // The Cloudinary URL
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});


router.delete("/", protect, teacherOnly, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    await deleteImageFromCloudinary(imageUrl);
    res.status(200).json({ success: true, message: "Image successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image" });
  }
});

export default router;