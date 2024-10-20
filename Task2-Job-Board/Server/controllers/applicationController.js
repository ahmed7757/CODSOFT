import Application from '../models/Application.js';

// Apply for Job
export const applyForJob = async (req, res) => {
  const { resumeLink, coverLetter } = req.body;
  const { jobId } = req.params;

  try {
    const newApplication = new Application({
      jobId,
      applicantId: req.user.id,  // Assuming user is authenticated
      resumeLink,
      coverLetter
    });

    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Applications by User
export const getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user.id });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Application Status
export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const { applicationId } = req.params;

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    await application.save();
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};