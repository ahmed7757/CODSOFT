// Import dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // To handle Cross-Origin requests
import connectDB from "./config/db.js"; // MongoDB connection
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import emailRoutes from "./routes/emailRoutes.js"; // Adjust the import path
import { protect } from "./middleware/authMiddleware.js";
import session from "express-session";
import passport from "./middleware/passport.js";
import helmet from "helmet"; // For securing HTTP headers
import rateLimit from "express-rate-limit"; // For rate limiting
import mongoSanitize from "express-mongo-sanitize"; // For preventing NoSQL injection
import hpp from "hpp"; // To prevent HTTP parameter pollution
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Use email routes
app.use("/api/notifications", emailRoutes);

// Use Helmet to set security-related HTTP headers
app.use(helmet());

// Enable CORS (you can configure specific origins if needed)
app.use(cors());

// Rate Limiting - limits each IP to 100 requests per 10 minutes
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 10 minutes",
});
app.use(limiter);

// Body parser for JSON
app.use(express.json());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Prevent HTTP parameter pollution
app.use(hpp());

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable HTTPS (ensure you have an SSL certificate)
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const privateKey = fs.readFileSync(
    path.join(__dirname, "ssl", "key.pem"),
    "utf8"
  );
  const certificate = fs.readFileSync(
    path.join(__dirname, "ssl", "cert.pem"),
    "utf8"
  );
  const credentials = { key: privateKey, cert: certificate };
  const https = require("https");
  const server = https.createServer(credentials, app);

  // Start the HTTPS server
  server.listen(process.env.PORT || 5000, () => {
    console.log(`Secure server running on port ${process.env.PORT || 5000}`);
  });
} else {
  // Start HTTP server in non-production environments
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}

// Session management
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS in production
      httpOnly: true, // Prevent client-side JS from accessing the cookies
      maxAge: 24 * 60 * 60 * 1000, // Set cookie expiration (1 day)
    },
  })
);

// Initialize passport session
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Define Routes
app.use("/api/users", userRoutes); // User routes (registration, login)
app.use("/api/jobs", jobRoutes); // Job routes (create, read, update, delete)
app.use("/api/applications", protect, applicationRoutes); // Application routes (requires auth)

// Root endpoint for checking server status
app.get("/", (req, res) => {
  res.send("API is running...");
});
