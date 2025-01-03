// config/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Create a database connection
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to the database
con.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Successfully connected to the database.');
});

// Export the connection to use in other files
export default con;
