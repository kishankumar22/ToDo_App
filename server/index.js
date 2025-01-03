import express from 'express';
import cors from 'cors';
import registrationRoutes from './routes/registrationRoutes.js';  // Import the registration routes
import authRoutes from './routes/authRoutes.js' 
import db from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // To allow cross-origin requests

// Test Route
app.get('/', (req, res) => {
  res.send('Hello, Server is running!');
});

// Test Database Connection
app.get('/api/user', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('❌ Database query failed:', err.message);
      res.status(500).send('Database query failed');
      return res.json(results);
    }
  
    // // Check if results are not empty
    // if (results.length > 0) {
    //   // Send the results as JSON
    //   res.json(results); // This will send the entire array of user objects
    // } else {
    //   // If no users are found, send an appropriate message
    //   res.status(404).send('No users found');
    // }
  });
});

// Use registration routes for registration
app.use('/api', registrationRoutes);  // All registration routes will now be prefixed with '/api'

// Use auth routes for login
app.use('/api', authRoutes);  

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
