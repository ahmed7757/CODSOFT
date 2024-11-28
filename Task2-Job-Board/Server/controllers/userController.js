import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';

// Register User
export const registerUser = async (req, res) => {
  const { email, password, role, userName, name, companyName, gender } = req.body;

  try {
    // Check if email or userName already exists
    const userExists = await User.findOne({ $or: [{ email }, { userName }] });
    if (userExists) {
      const existingField = userExists.email === email ? 'Email' : 'Username';
      return res.status(400).json({ message: `${existingField} already exists` });
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      role,
      userName,
      profile: {
        name,
        gender,
        companyName: role === 'employer' ? companyName : undefined,
      }
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = error.keyPattern.email ? 'Email' : 'Username';
      res.status(400).json({ message: `${duplicateField} already exists` });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Find user by userName or email
    const user = await User.findOne({ $or: [{ userName }, { email }] });

    if (!user) {
      console.log("Invalid username or email or password");
      return res.status(400).json({ message: 'Invalid username or email or password' });
    }

    const isMatch = await user.matchPassword(password, user.password);

    if (!isMatch) {
      console.log("Invalid username or email or password");
      return res.status(400).json({ message: 'Invalid username or email or password' });
    }


    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProfile = async (req, res) => {
  let userId = req.currentUser._id;
  if (!userId) {
    return res.status(400).json({ message: 'User not found' });
  }
  const user = await User.findById(userId);
  res.status(200).json({
    message: 'User found',
    user
  });
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.currentUser?._id; // Ensure this is set by middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const updatedProfile = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle profile picture or resume updates
    if (req.file?.filename) {
      try {
        await deleteOldFiles(user);
      } catch (error) {
        console.error("Error deleting old files:", error);
        return res.status(500).json({ error: "Failed to delete old files" });
      }
    }

    // Check if username or email already exists (only if updated)
    if (updatedProfile.userName && updatedProfile.userName !== user.userName) {
      const existingUserName = await User.findOne({ userName: updatedProfile.userName });
      if (existingUserName) {
        return res.status(400).json({ message: "Username already exists", code: 4002 });
      }
    }

    if (updatedProfile.email && updatedProfile.email !== user.email) {
      const existingEmail = await User.findOne({ email: updatedProfile.email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists", code: 4003 });
      }
    }

    // Update user profile
    applyProfileUpdates(user, updatedProfile, req.file?.filename);

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const applyProfileUpdates = (user, updatedProfile, filename) => {
  user.userName = updatedProfile.userName || user.userName;
  user.email = updatedProfile.email || user.email;
  user.profile.gender = updatedProfile.gender || user.profile.gender;
  user.profile.name = updatedProfile.name || user.profile.name;
  user.profile.companyName = updatedProfile.companyName || user.profile.companyName;
  user.profile.companyWebsite = updatedProfile.companyWebsite || user.profile.companyWebsite;

  // Update profile picture or resume
  if (filename) {
    if (updatedProfile.profilePicture) {
      user.profile.profilePicture = filename;
    }
    if (updatedProfile.resume) {
      user.profile.resume = filename;
    }
  };
};

const deleteOldFiles = async (user) => {
  try {
    const deletePromises = [];

    if (user.profile.resume) {
      deletePromises.push(fs.promises.unlink(`uploads/${user.profile.resume}`));
    }
    if (user.profile.profilePicture) {
      deletePromises.push(fs.promises.unlink(`uploads/${user.profile.profilePicture}`));
    }

    await Promise.all(deletePromises);
  } catch (error) {
    // Log the error but do not throw it to avoid stopping the update process
    console.error("Error deleting old files:", error);
  }
};  