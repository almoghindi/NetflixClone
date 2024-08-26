import express from 'express';
import { VideoController } from '../controllers/videoController';

const router = express.Router();

router.get('/stream/:movieName', VideoController.getMovieUrl);

export default router;