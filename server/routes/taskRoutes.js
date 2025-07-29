import express from 'express';
import prisma from '../config/db.js';

const router = express.Router();

// 1. Show today's tasks (incomplete)
router.get('/todaytask', async (req, res) => {
  const userId = parseInt(req.query.user_id);
  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    const tasks = await prisma.task.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: today,
          lt: tomorrow,
        },
      },
      orderBy: { title: 'desc' },
    });

    if (tasks.length > 0) res.json(tasks);
    else res.status(404).json({ message: 'No tasks found for today' });
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});


// 2. Yesterday's tasks
router.get('/yestask', async (req, res) => {
  const userId = parseInt(req.query.user_id);
  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  try {
    const tasks = await prisma.task.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: yesterday,
          lt: today,
        },
      },
      orderBy: { title: 'desc' },
    });

    if (tasks.length > 0) res.json(tasks);
    else res.status(404).json({ message: 'No tasks found for yesterday' });
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});


// 3. Last 2 days' tasks
router.get('/lasttwodays', async (req, res) => {
  const userId = parseInt(req.query.user_id);
  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  try {
    const tasks = await prisma.task.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: twoDaysAgo,
          lt: today, // ends at start of today
        },
      },
      orderBy: { created_at: 'desc' },
    });

    if (tasks.length > 0) res.json(tasks);
    else res.status(404).json({ message: 'No tasks found in last 2 days' });
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});


// 4. Add a task
router.post('/addtask', async (req, res) => {
  const { user_id, title } = req.body;

  if (!user_id || !title) {
    return res.status(400).json({ error: 'User ID and Title are required' });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        user_id: parseInt(user_id), // 👈 convert to number
        title,
      },
    });

    res.status(201).json({ message: 'Task added', task: newTask });
  } catch (error) {
    console.error('❌ Prisma Error:', error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
});


// 5. Delete task
router.delete('/deletetask/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deleted = await prisma.task.delete({ where: { id } });
    res.status(200).json({ message: 'Task deleted successfully', deleted });
  } catch (err) {
    res.status(404).json({ error: 'Task not found' });
  }
});

// 6. Update task title
router.put('/updatetask/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: { title },
    });
    res.status(200).json({ message: 'Task updated successfully', updated });
  } catch (err) {
    res.status(404).json({ error: 'Task not found' });
  }
});

// 7. Update task checkbox
router.put('/checkboxtask/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: { completed },
    });
    res.status(200).json({ message: 'Task updated successfully', updated });
  } catch (err) {
    res.status(404).json({ error: 'Task not found' });
  }
});

// 8. Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 9. Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 10. Get user by ID
router.get('/users/:userId', async (req, res) => {
  const id = parseInt(req.params.userId);

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

export default router;
