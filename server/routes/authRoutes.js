// auth.js (or your routes file)
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import the JWT library
import db from '../config/db.js';

const router = express.Router();

// 🚀 User Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM users WHERE email = ? OR mobile = ?';
    db.query(query, [username, username], async (err, results) => {
      if (err) {
        console.error('❌ Database query failed:', err.message);
        return res.status(500).json({ error: 'Database query failed' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User  not found' });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT with 10 minutes expiration
      const token = jwt.sign(
        { userId: user.id, username: user.name }, // Payload
        'todotask', // Replace with your secret key
        { expiresIn: '1' } // Token expiration time
      );

      res.status(200).json({
        message: 'Login successful',
        token: token, // Send the generated JWT
        userId: user.id, // Send the userId in the response
        username: user.name,
      });
    });
  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;