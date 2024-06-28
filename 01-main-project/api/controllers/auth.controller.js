import bcryptjs from "bcryptjs";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // HASSED PASSWORD -->
    const hashedPassword = await bcryptjs.hash(password, 12);

    // NEW USER -->
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "user created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create User!" });
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // CHECK IF USER EXIST
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });
    const { password: userPassword, ...rest } = user;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        // secure: true,
        sameSite: "strict",
        maxAge: age,
      })
      .json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to LogIn!" });
  }
};

export const logout = (req, res, next) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logout successfully" });
};
