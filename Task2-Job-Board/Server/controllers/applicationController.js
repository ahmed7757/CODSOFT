import Application from '../models/Application.js';
import { sendEmailNotification } from './emailService.js';
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
  const { applicationId, status } = req.body;

  try {
    const application = await Application.findById(applicationId);
    console.log(application, applicationId)
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    application.status = status;
    await application.save();
    const userEmail = application.user.email;
    const subject = `Your Job Application Status: ${status}`;
    const message = `Dear ${application.user.name},\n\nYour job application for the position "${application.job.title}" has been updated to: ${status}.\n\nBest regards,\nYour Job Board Team`;
    await sendEmailNotification(userEmail, subject, message);

    res.status(200).json({ message: 'Application status updated and email sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.error('Error updating application status:', error);
  }
};