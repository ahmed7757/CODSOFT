import express from 'express';
import { sendEmailNotification } from '../controllers/emailService.js'; // Adjust the import path based on your project structure
import { protect } from '../middleware/authMiddleware.js'; // Ensure this path is correct
const router = express.Router();

// Send a test email
router.post('/test-email', protect, async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        await sendEmailNotification(to, subject, text);
        res.status(200).json({ message: 'Test email sent successfully!' });
    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({ error: 'Failed to send test email' });
    }
});

export default router;
