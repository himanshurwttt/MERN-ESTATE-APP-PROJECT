import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({ message: "User Not Authenticated" });
  else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
      if (error) return res.status(401).json({ message: "Token is not Valid" });
      req.userId = payload.id;
      next();
    });
  }
};

export default verifyToken;
