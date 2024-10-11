import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import packageRoutes from './routes/packageRoutes';
import interviewRoutes from './routes/interviewRoutes';
import authMiddleware from './middleware/authMiddleware';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS with credentials for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Frontend adresiniz (React uygulamanızın URL'si)
  credentials: true, // Cookie'leri göndermek için gerekli
}));

// Middleware to parse cookies and JSON requests
app.use(cookieParser());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Public route for authentication
app.use('/api/auth', authRoutes); // Auth routes

// Protected routes
app.use('/packages', authMiddleware, packageRoutes); // Package routes with JWT protection
app.use('/interviews', authMiddleware, interviewRoutes); // Interview routes with JWT protection

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
