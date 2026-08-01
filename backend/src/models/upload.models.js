import mongoose from "mongoose";
const uploadSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: String,
    code: String,
    description: String,
    language: String,
  },
  { timestamps: true },
);
const UploadModel = mongoose.model("upload", uploadSchema);
export default UploadModel;
