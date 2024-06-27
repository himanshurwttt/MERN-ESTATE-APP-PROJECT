import express from "express";
import {
  addpost,
  deletepost,
  getpost,
  getposts,
  updatepost,
} from "../controllers/post.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getposts);
router.get("/:id", getpost);
router.post("/", verifyToken, addpost);
router.put("/:id", verifyToken, updatepost);
router.delete("/:id", verifyToken, deletepost);

export default router;
