import express from 'express';
import cors from 'cors';
import registrationRoutes from './routes/registrationRoutes.js';  // Import the registration routes
import authRoutes from './routes/authRoutes.js' 
import taskRoutes from './routes/taskRoutes.js';




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // To allow cross-origin requests

// Test Route
app.get('/', (req, res) => {
  res.send('Hello, Server is running ! to do app');
});



// Use registration routes for registration
app.use('/api', registrationRoutes);  // All registration routes will now be prefixed with '/api'

// Use auth routes for login
app.use('/api',authRoutes);  
app.use('/api', registrationRoutes);
app.use('/api', taskRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
