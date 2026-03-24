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

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    teacherSlug: {
      type: String,
      required: true,
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

courseSchema.index({ teacherSlug: 1, slug: 1 }, { unique: true });

export default mongoose.model("Course", courseSchema);
