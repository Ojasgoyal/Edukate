import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    teacherSlug:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

studentSchema.index(
  { email: 1, teacherSlug: 1 },
  { unique: true }
);

export default mongoose.model("Student", studentSchema);