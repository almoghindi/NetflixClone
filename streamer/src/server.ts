import express from 'express';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes';
import path from 'path';

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());

app.use(express.json());

app.use('/api/video', videoRoutes);

app.use('/videos', express.static(path.resolve(__dirname, 'videos')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
