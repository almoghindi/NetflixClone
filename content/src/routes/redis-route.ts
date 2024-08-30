import express from 'express';
import { getContentTrailers, getTrendingContent, getTreiler, getContentByCategory, TrendingAllMovies} from '../controllers/redis-controller';


const redisRouter = express.Router();

// Route to get movies or TV shows
redisRouter.get('/trending/all', TrendingAllMovies)
redisRouter.get('/movie/:id', getTreiler); // `/123`
redisRouter.get("/:category/:type", getContentByCategory); // `/action/movie`
redisRouter.get('/:type/:id', getContentTrailers); // `/movie/123`
redisRouter.get('/:type', getTrendingContent); // `/movie`

export default redisRouter;