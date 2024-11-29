import express from "express";
import {
  applyForJob,
  getApplicationsByUser,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.post("/apply/:jobId", protect, upload.single("resume"), applyForJob); // Protect this route
router.get("/", protect, getApplicationsByUser); // Protect this route
router.put(
  "/updateApplication/:applicationId",
  protect,
  updateApplicationStatus
); // Employer updates application status

export default router;
