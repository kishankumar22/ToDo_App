import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js'; // ✅ this should export your Prisma client

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required' });

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: username },
          { mobile: username },
        ],
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, username: user.name }, 'todotask', {
      expiresIn: '10m',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user.id,
      username: user.name,
    });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
