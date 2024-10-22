import Job from '../models/Job.js';

// Create Job
export const createJob = async (req, res) => {
  const { title, description, requirements, location, salaryRange, jobType } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      requirements,
      location,
      salaryRange,
      jobType,
      employer: req.user.id  // Assuming user is authenticated
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Read All Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

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