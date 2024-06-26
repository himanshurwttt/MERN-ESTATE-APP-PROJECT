import prisma from "../lib/prisma.js";
import bcryptjs from "bcryptjs";
export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Users" });
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get User" });
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const UserId = req.userId;
  if (id != UserId) {
    return res.status(403).json({ message: "User Not Authorized!" });
  }

  try {
    const { password, avatar, ...inputs } = req.body;
    let hashPassword;
    if (password) {
      hashPassword = bcryptjs.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(password && { password: hashPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: pass, ...rest } = updatedUser;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update User" });
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const UserId = req.userId;

  if (id != UserId) {
    return res.status(403).json({ message: "User Not Authorized!" });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
