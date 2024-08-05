import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { corsConfiguration } from './configurations/cors';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors(corsConfiguration()));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.log(err.message);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});