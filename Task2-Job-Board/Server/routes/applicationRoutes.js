import express from 'express';
import { applyForJob, getApplicationsByUser, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply/:jobId', applyForJob);  // User applies for a job
router.get('/getApplication', getApplicationsByUser);  // Get user’s applications
router.put('/updateApplication',protect , updateApplicationStatus);  // Employer updates application status

export default router;
