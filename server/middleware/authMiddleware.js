import jwt from 'jsonwebtoken';

// Middleware to verify the token
export const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming the format is "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    req.userId = decoded.id; // Assuming the token contains the user ID in the payload
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('❌ Invalid token:', err.message);
    return res.status(401).json({ error: 'Invalid Token' });
  }
};