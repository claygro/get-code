import authModel from "../models/auth.models.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import "dotenv/config";
import { generateAccessToken } from "../utils/generateToken.js";
class AuthControllers {
  async signup(req, res) {
    try {
      const { userName, email, password } = req.body;

      if (!userName || !email || !password) {
        return res.status(400).json({
          message: "All fields are required.",
        });
      }

      const userExists = await authModel.findOne({
        $or: [{ userName }, { email }],
      });

      if (userExists) {
        return res.status(409).json({
          message: "userName or email already exists.",
        });
      }

      const hashedPassword = await argon2.hash(password);

      const user = await authModel.create({
        userName,
        email,
        password: hashedPassword,
      });

      generateAccessToken(user);

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(201).json({
        message: "User registered successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  //login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await authModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      const isPasswordCorrect = await argon2.verify(user.password, password);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid credentials.",
        });
      }

      const accessToken = generateAccessToken(user);

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({
        message: "Login successful.",
        accessToken,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
export default AuthControllers;
