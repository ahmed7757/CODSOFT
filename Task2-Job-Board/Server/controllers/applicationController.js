import Application from "../models/Application.js";
import { sendEmailNotification } from "./emailService.js";
// Apply for Job
export const applyForJob = async (req, res) => {
  const { coverLetter } = req.body;
  const { jobId } = req.params;
  // Get the uploaded resume file path
  let resumeLink = req.file ? req.file.path.replace(/\\/g, "/") : null;
  console.log("Uploaded resume file path:", resumeLink); // Add this log
  try {
    if (!resumeLink) {
      return res.status(400).json({ error: "Resume is required" });
    }

    const newApplication = new Application({
      jobId,
      applicantId: req.user.id, // Assuming user is authenticated
      resumeLink,
      coverLetter,
    });

    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error applying for job:", error.message); // Log the error message
    res.status(500).json({ error: error.message }); // Return a more detailed error
  }
};

// Get Applications by User
export const getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user.id });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update Application Status
export const updateApplicationStatus = async (req, res) => {
  const { applicationId, status } = req.body;

  try {
    // Fetch application and populate applicant and job fields
    const application = await Application.findById(applicationId)
      .populate("applicantId", "email name") // Populate user details
      .populate("jobId", "title"); // Populate job details

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Validate status
    const validStatuses = [
      "applied",
      "under review",
      "accepted",
      "rejected",
      "withdrawn",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Update status
    application.status = status;
    await application.save();

    // Get user email and name from populated applicantId
    const userEmail = application.applicantId.email; // Use `applicantId` instead of `user`
    const userName = application.applicantId.name; // Use `applicantId` instead of `user`
    const jobTitle = application.jobId.title; // Use `jobId` instead of `job`

    // Prepare email content
    const subject = `Your Job Application Status: ${status}`;
    const message = `Dear ${userName},\n\nYour job application for the position "${jobTitle}" has been updated to: ${status}.\n\nBest regards,\nYour Job Board Team`;

    // Send email notification
    await sendEmailNotification(userEmail, subject, message);

    // Return success response
    res
      .status(200)
      .json({ message: "Application status updated and email sent!" });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Server error" });
    console.error("Error updating application status:", error);
  }
};
