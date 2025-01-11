import express from 'express';
import db from '../config/db.js';

const router = express.Router();

//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

//1. show uncomplete task of user ✅✅✅✅
router.get('/taskslist', (req, res) => {
  const userId = req.query.user_id; // Get user_id from query parameters
if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  db.query(
    `SELECT id, title, completed, DATE_FORMAT(created_at, '%m/%d/%Y') as date FROM tasks WHERE user_id = ? AND completed = false  order by title desc `,
    [userId],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err.message);
        return res.status(500).json({ error: 'Database query failed' });
      }

      if (results.length > 0) {
        return res.json(results); // Send tasks back to the frontend
      } else {
        return res.status(404).json({ message: 'No tasks found' });
      }
    }
  );
});

//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

//2.show completed  task  ✅✅✅✅
router.get('/completed', (req, res) => {
  const userId = req.query.user_id; // Get user_id from query parameters
if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  db.query(
    `SELECT id, title, completed FROM tasks WHERE user_id = ? and completed=true `,
    [userId],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err.message);
        return res.status(500).json({ error: 'Database query failed' });
      }

      if (results.length > 0) {
        return res.json(results); // Send tasks back to the frontend
      } else {
        return res.status(404).json({ message: 'No tasks found' });
      }
    }
  );
});

//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

//3. Add a new task  ✅✅✅✅
router.post('/addtask', (req, res) => {

  const { user_id, title } = req.body;

  if (!user_id || !title) {
    return res.status(400).json({ error: 'User ID and Task name are required' });
  }
  const query = 'INSERT INTO tasks (user_id, title) VALUES (?, ?)';
  db.query(query, [user_id, title], (err) => {
    if (err) {
      console.error('❌ Failed to add task:', err.message);
      return res.status(500).json({ error: 'Failed to add task' });
    }
    res.status(201).json({ message: 'Task added successfully' });
  });
});


//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

//4. DELETE endpoint to remove a task by ID✅✅✅✅
router.delete('/deletetask/:id', (req, res) => {
    const taskId = req.params.id; // Get the task ID from the URL parameters
  
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
  
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [taskId], (err, results) => {
      if (err) {
        console.error('❌ Failed to delete task:', err.message);
        return res.status(500).json({ error: 'Failed to delete task' });
      }
  
      // Check if any rows were affected (i.e., if the task existed)
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully' });
    });
  });

//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

  // 5. update task PUT endpoint to update a task by ID✅✅✅✅
  
router.put('/updatetask/:id', (req, res) => {
  const taskId = req.params.id; // Get the task ID from the URL parameters
  const { title } = req.body; // Get the new title from the request body

  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  if (!title) {
    return res.status(400).json({ error: 'New title is required' });
  }

  const query = 'UPDATE tasks SET title = ? WHERE id = ?';
  db.query(query, [title, taskId], (err, results) => {
    if (err) {
      console.error('❌ Failed to update task:', err.message);
      return res.status(500).json({ error: 'Failed to update task' });
    }

    // Check if any rows were affected (i.e., if the task existed)
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully' });
  });
});

  // 6. update checkbox  task complted✅✅✅✅
  router.put('/checkboxtask/:id', (req, res) => {
    const taskId = req.params.id; // Get the task ID from the URL parameters
    const { completed } = req.body; // Get the completed status from the request body
  
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
  
    // Ensure completed is a boolean (true or false)
    if (completed === undefined || completed === null) {
      return res.status(400).json({ error: 'Completed status is required' });
    }
  
    const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
    db.query(query, [completed, taskId], (err, results) => {
      if (err) {
        console.error('❌ Failed to update task:', err.message);
        return res.status(500).json({ error: 'Failed to update task' });
      }
  
      // Check if any rows were affected (i.e., if the task existed)
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task updated successfully' });
    });
  });
  

//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
  // 7. update checkbox  task complted✅✅✅✅
  
router.put('/uncheckboxtask/:id', (req, res) => {
  const taskId = req.params.id; // Get the task ID from the URL parameters
  const { completed } = req.body; // Get the new title from the request body

  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  if (completed === undefined) {
    return res.status(400).json({ error: 'Completed status is required' });
  }
  

  const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
  db.query(query, [completed, taskId], (err, results) => {
    if (err) {
      console.error('❌ Failed to update task:', err.message);
      return res.status(500).json({ error: 'Failed to update task' });
    }

    // Check if any rows were affected (i.e., if the task existed)
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully' });
  });
});

//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

// 8. search implementing by title

router.get('/search', (req, res) => {
  const userId = req.query.user_id; // Get user_id from query parameters
  const searchTerm = req.query.title; // Get search term from query parameters

  if (!userId) {
    return res.status(400).json({ error: 'User  ID is required' });
  }

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  db.query(
    `SELECT id, title, completed FROM tasks WHERE user_id = ? AND title LIKE ?`,
    [userId, `%${searchTerm}%`], // Use LIKE for partial matching
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err.message);
        return res.status(500).json({ error: 'Database query failed' });
      }

      if (results.length > 0) {
        return res.json(results); // Send tasks back to the frontend
      } else {
        return res.status(404).json({ message: 'No tasks found' });
      }
    }
  );
});

//1. get all users   all or specific

router.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('❌ Database query failed:', err.message);
      return res.status(500).json({ error: 'Database query failed' }); // Send error response
    }
  // Check if results are not empty
    if (results.length > 0) {
      // Send the results as JSON
      return res.json(results); // This will send the entire array of user objects
    } else {
      // If no users are found, send an appropriate message
      return res.status(404).json({ message: 'No users found' });
    }
  });
});

//2. Fetch  all  user/ by id ✅✅  
router.get('/users', (req, res) => {

  const query = 'SELECT * FROM users ';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Failed to fetch tasks:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// get user by id
router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('❌ Failed to fetch tasks:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});





export default router;