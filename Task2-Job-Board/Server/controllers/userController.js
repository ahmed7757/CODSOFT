import User from '../models/user.js';
import bcrypt from 'bcryptjs';
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
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
  const { email, userName, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne(email ? { email } : { userName });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5000h' });

    res.json({ token, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
