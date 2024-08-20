import express from 'express';
import { processVideo, streamVideo } from '../controllers/videoController';

const router = express.Router();

router.post('/process', processVideo);
router.get('/stream/:movieName', streamVideo);

export default router;