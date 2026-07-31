
import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.userName,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );
};
