import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const router = express.Router();

// 🚀 User Registration Route
router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  // Validate input fields
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    const query = 'INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, mobile, hashedPassword], (err, result) => {
      if (err) {
        console.error('❌ Registration failed:', err.message);
        return res.status(500).json({ error: 'Registration failed' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
