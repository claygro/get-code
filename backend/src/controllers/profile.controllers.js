import jwt from "jsonwebtoken";
import "dotenv/config";
import authModel from "../models/auth.models.js";
import { generateAccessToken } from "../utils/generateToken.js";

class ProfileControllers {
  async getProfile(req, res) {
    const userId = req.user.id;

    try {
      const user = await authModel.findById({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in getting profile ${error.message}` });
    }
  }
  //update profile
  async updateProfile(req, res) {
    const userId = req.user.id;
    const { userName, email } = req.body;
    try {
      const updatedField = { userName, email };
      const updatedProfile = await authModel.findByIdAndUpdate(
        userId,
        {
          $set: updatedField,
        },
        { returnDocument: "after", runValidators: true },
      );

      const accessToken = generateAccessToken(updatedProfile);
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ message: "Successfully updated profile" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to update profile ${error.message}` });
    }
  }
}
export default ProfileControllers;
