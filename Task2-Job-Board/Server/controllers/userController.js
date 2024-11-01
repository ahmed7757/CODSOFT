import User from '../models/user.js';
import jwt from 'jsonwebtoken';

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