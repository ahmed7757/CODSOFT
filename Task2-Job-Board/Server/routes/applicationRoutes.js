import express from 'express';
import { applyForJob, getApplicationsByUser, updateApplicationStatus } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/apply/:jobId', applyForJob);  // User applies for a job
router.get('/applications', getApplicationsByUser);  // Get user’s applications
router.put('/application/:id', updateApplicationStatus);  // Employer updates application status

export default router;
