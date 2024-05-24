import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import cors from "cors"
import studentRoutes from './routes/studentRoutes';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors())

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/students', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
