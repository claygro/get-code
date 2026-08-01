import jwt from "jsonwebtoken";
import "dotenv/config";
const UserMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Please loggedin first" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        }
        if (err.name === "JsonWebTokenError") {
          return res.status(403).json({ message: "Invalid token signature" });
        }
        return res.status(403).json({ message: "Token verification failed" });
      }
      req.user = result;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: `Error in middleware ${error}` });
  }
};
export default UserMiddleware;
