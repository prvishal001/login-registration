import express from 'express';
import User from '../models/User.js'; // Import User model
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials hai' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful ho gya', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error hai' });
  }
});

// Fetch logged-in user's details
router.get('/me', async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Extract token
  
    if (!token) return res.status(401).send('Access Denied');
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decoding token
  
      // Find user by id
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).send('User not found');
  
      // Send user data
      res.json({ name: user.name, email: user.email });
    } catch (error) {
      res.status(403).send('Invalid or expired token');
    }
  });
  

export default router;
