import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const router = express.Router();

// 🚀 User Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Find user by username (email or mobile)
    const query = 'SELECT * FROM users WHERE email = ? OR mobile = ?';
    db.query(query, [username, username], async (err, results) => {
      if (err) {
        console.error('❌ Database query failed:', err.message);
        return res.status(500).json({ error: 'Database query failed' });
      }

      // If user not found
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare password
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // If credentials are correct, return user data (you can extend this for JWT or session)
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
        },
      });
    });
  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
