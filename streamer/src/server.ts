import express from 'express';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/video', videoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
