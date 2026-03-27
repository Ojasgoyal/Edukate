import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.index(
  { email: 1, slug: 1 },
  { unique: true }
);

userSchema.index(
  { slug: 1 },
  { unique: true, partialFilterExpression: { role: "teacher" } },
);

export default mongoose.model("User", userSchema);
