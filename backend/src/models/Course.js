import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    courseSlug: {
      type: String,
      required: true,
      lowercase: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    tenant: {
      type: String,
      required: true,
      lowercase:true
    },

    lectures: [
      {
        title: String,
        videoUrl: String, // optional
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

courseSchema.index({ tenant: 1, courseSlug: 1 }, { unique: true });

export default mongoose.model("Course", courseSchema);
