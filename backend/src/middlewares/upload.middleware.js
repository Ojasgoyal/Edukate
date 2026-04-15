import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "edukate_thumbnails",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export const upload = multer({ storage });

export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v1234/edukate_thumbnails/abcde.jpg
    // We need to extract the "edukate_thumbnails/abcde" part
    const parts = imageUrl.split("/");
    const filenameWithExt = parts[parts.length - 1]; // abcde.jpg
    const folder = parts[parts.length - 2];          // edukate_thumbnails
    const publicId = `${folder}/${filenameWithExt.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted old image from Cloudinary: ${publicId}`);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary", error);
  }
};