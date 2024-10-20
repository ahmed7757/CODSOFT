// Import dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // To handle Cross-Origin requests
import connectDB from './config/db.js';  // MongoDB connection
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import { protect } from './middleware/authMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());  // To parse JSON bodies
app.use(cors());  // Enable CORS

// Connect to MongoDB
connectDB();

// Define Routes
app.use('/api/users', userRoutes);  // User routes (registration, login)
app.use('/api/jobs', jobRoutes);    // Job routes (create, read, update, delete)
app.use('/api/applications', protect, applicationRoutes);  // Application routes (requires auth)

// Root endpoint for checking server status
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Set up the server port from .env file or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
