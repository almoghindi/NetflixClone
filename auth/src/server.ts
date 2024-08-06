import express from 'express';
import dotenv from 'dotenv';
import { corsConfiguration } from './configurations/cors';
import cors from 'cors';
import { DBConnect } from './configurations/database';
import authRoutes from './routes/auth-routes';
import errorHandler from './middleware/error-handler';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors(corsConfiguration()));

DBConnect();

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is on Fire at http://localhost:${port}`);
});