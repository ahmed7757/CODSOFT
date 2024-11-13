import rateLimit from 'express-rate-limit';
import Job from '../models/Job.js';

// Create Job
export const createJob = async (req, res) => {
  const { title, description, requirements, location, salaryRange, jobType, companyName } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      requirements,
      location,
      salaryRange,
      jobType,
      companyName,
      employer: req.user.id  // Assuming user is authenticated
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Read All Jobs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

export const getAllJobs = [limiter, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const jobs = await Job.find().skip(skip).limit(limit);
    res.status(200).json(jobs);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation error' });
    } else if (error.name === 'MongoNetworkError') {
      res.status(503).json({ error: 'Database connection error' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
}];

// Read Job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  const { title, description, requirements, location, salary, jobType } = req.body;

  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update job fields
    job.title = title || job.title;
    job.description = description || job.description;
    job.requirements = requirements || job.requirements;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.jobType = jobType || job.jobType;

    await job.save();
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await job.deleteOne();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.log(error);
  }
};