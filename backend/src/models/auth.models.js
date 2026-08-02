import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  avatar: {
    type: string,
  },
  userName: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  github: String,
  linkedIn: String,
  bio: String,
  experience: String,
});
const authModel = mongoose.model("user", userSchema);
export default authModel;
