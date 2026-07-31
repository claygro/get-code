import jwt from "jsonwebtoken";
import "dotenv/config";
import authModel from "../models/auth.models.js";

class ProfileControllers {
  async profile(req, res) {
    const token = req.cookies.token;

    try {
      if (!token) {
        return res
          .status(404)
          .json({ message: "Please loggedin or signup first." });
      }
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await authModel.findById({ _id: decode.id });
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
}
export default ProfileControllers;
