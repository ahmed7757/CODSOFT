import express from 'express';
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js'; // Ensure this path is correct

const router = express.Router();

router.post('/create', protect, createJob);  // For employer to post a job
router.get('/getJobs', getAllJobs);     // Fetch all jobs
router.get('/getJob/:id', getJobById);  // Fetch single job details
router.put('/updateJob/:id', updateJob);  // Update job details
router.delete('/deleteJob/:id', deleteJob);  // Delete job

export default router;
