import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// 🚀 User Registration Route with Prisma
router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // ✅ Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { mobile: mobile }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or mobile already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('❌ Prisma Error:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

export default router;
