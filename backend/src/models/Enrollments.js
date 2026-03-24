import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    teacherSlug: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// prevent duplicate enrollment
enrollmentSchema.index(
  { studentId: 1, courseId: 1 },
  { unique: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);