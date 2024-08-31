import express from 'express';
import { getContentTrailers, getTrendingContent, getTreiler, getContentByCategory, TrendingAllMovies, getTvShows, TrendingAllTv} from '../controllers/redis-controller';


const redisRouter = express.Router();

// Route to get movies or 
redisRouter.get('/trending/all', TrendingAllMovies); // `/trending/all`
redisRouter.get('/trending/tv', TrendingAllTv); // `/trending/tv`
redisRouter.get('/:type/:id/trailer', getTreiler); // `/movie/123`
redisRouter.get("/tvshows", getTvShows); // `/tvshows`
redisRouter.get("/:category/:type", getContentByCategory); // `/action/movie`
redisRouter.get('/:type/:id', getContentTrailers); // `/movie/123`
redisRouter.get('/:type', getTrendingContent); // `/movie`


export default redisRouter;