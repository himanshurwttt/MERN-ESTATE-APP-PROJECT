import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const Token = req.cookies.TOKEN;
  if (!Token)
    return res.status(401).json({ message: "User Not Authenticated" });
  else {
    jwt.verify(Token, process.env.JWT_SECRET_KEY, async (error, payload) => {
      if (error) return res.status(401).json({ message: "Token is not Valid" });
      req.userId = payload.id;
      console.log(payload);
      next();
    });
  }
};

export default verifyToken;
