import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a Nodemailer transporter using SMTP (or another email service like Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587, // Use 587 for TLS or 465 for SSL
  secure: false, // Set to true for port 465 (SSL)
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send an email notification
export const sendEmailNotification = async (recipientEmail, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,  // Sender email
    to: recipientEmail,            // Recipient email
    subject: subject,              // Email subject
    text: message                  // Email content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
