import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import bodyParser from "body-parser";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getProfile", bodyParser.json(), protect, getProfile);
router.patch(
  "/updateProfile",
  bodyParser.json(),
  protect,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

export default router;
