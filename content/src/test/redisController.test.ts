// import request from 'supertest';
// import express, { Application } from 'express';
// import {
//   getTrendingContent,
//   getContentTrailers,
//   getContentDetails,
//   getSimilarContent,
//   searchContent,
//   getTreiler,
//   getContentByCategory,
// } from '../controllers/redis-controller'; // Adjust import path based on your structure
// import { redisClient } from '../configurations/redis';
// import { fetch } from '../utils/fetch-from-TMDB';

// // Mock the redisClient and fetch functions
// jest.mock('../configurations/redis', () => ({
//   redisClient: {
//     get: jest.fn(),
//     set: jest.fn(),
//     connect: jest.fn().mockResolvedValue(true),
//     on: jest.fn().mockReturnThis(), // To chain `on` calls
//   },
// }));

// jest.mock('../utils/fetch-from-TMDB', () => ({
//   fetch: jest.fn(),
// }));

// // Setup express app for testing
// const app: Application = express();
// app.use(express.json());

// app.get('/trending/:type', getTrendingContent);
// app.get('/trailers/:type/:id', getContentTrailers);
// app.get('/details/:type/:id', getContentDetails);
// app.get('/similar/:type/:id', getSimilarContent);
// app.get('/search/:text', searchContent);
// app.get('/treiler/:type/:id', getTreiler);
// app.get('/content/:type/:category', getContentByCategory);

// describe('ContentController', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear mocks before each test
//   });

//   describe('getTrendingContent', () => {
//     it('should return trending content from cache if available', async () => {
//       const redisMock = require('redis').createClient(); // Use the mocked Redis client
//       redisMock.get.mockResolvedValue(JSON.stringify({ results: [{ id: 1, name: 'Cached Content' }] }));

//       const response = await request(app).get('/trending/movie');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual({ id: 1, name: 'Cached Content' });
//       expect(redisMock.get).toHaveBeenCalledWith('trending:movie');
//     });

//     it('should fetch trending content if cache is empty', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockResolvedValue(null); // No cache
//       const fetch = jest.spyOn(require('../utils/fetch-from-TMDB'), 'fetch');
//       fetch.mockResolvedValue({ results: [{ id: 2, name: 'Fetched Content' }] });

//       const response = await request(app).get('/trending/tv');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual({ id: 2, name: 'Fetched Content' });
//       expect(redisMock.get).toHaveBeenCalledWith('trending:tv');
//       expect(fetch).toHaveBeenCalledWith('/trending/tv/day?language=en-US');
//       expect(redisMock.set).toHaveBeenCalledWith(
//         'trending:tv',
//         JSON.stringify({ results: [{ id: 2, name: 'Fetched Content' }] }),
//         { EX: 3600 }
//       );
//     });

//     it('should return 500 on Redis error', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockRejectedValue(new Error('Redis error'));

//       const response = await request(app).get('/trending/movie');

//       expect(response.status).toBe(500);
//       expect(response.body.message).toBe('Internal server error');
//     });
//   });

//   describe('getContentTrailers', () => {
//     it('should return trailers for a TV show', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockResolvedValue(null);
//       const fetch = jest.spyOn(require('../utils/fetch-from-TMDB'), 'fetch');
//       fetch.mockResolvedValue({ id: 1, results: [{ id: 1, name: 'Trailer' }] });

//       const response = await request(app).get('/trailers/tv/1');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual({ id: 1, results: [{ id: 1, name: 'Trailer' }] });
//       expect(fetch).toHaveBeenCalledWith('/tv/1/videos?language=en-US');
//     });

//     it('should return trailers for a movie', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockResolvedValue(null);
//       const fetch = jest.spyOn(require('../utils/fetch-from-TMDB'), 'fetch');
//       fetch.mockResolvedValue({ id: 1, results: [{ id: 1, name: 'Trailer' }] });

//       const response = await request(app).get('/trailers/movie/1');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual([{ id: 1, name: 'Trailer' }]);
//       expect(fetch).toHaveBeenCalledWith('/movie/1/videos?language=en-US');
//     });

//     it('should return 500 on Redis error', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockRejectedValue(new Error('Redis error'));

//       const response = await request(app).get('/trailers/movie/1');

//       expect(response.status).toBe(500);
//       expect(response.body.message).toBe('Internal server error');
//     });
//   });

//   describe('getContentDetails', () => {
//     it('should return content details', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockResolvedValue(null);
//       const fetch = jest.spyOn(require('../utils/fetch-from-TMDB'), 'fetch');
//       fetch.mockResolvedValue({ id: 1, name: 'Content Details' });

//       const response = await request(app).get('/details/movie/1');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual({ id: 1, name: 'Content Details' });
//       expect(fetch).toHaveBeenCalledWith('/movie/1?language=en-US');
//     });

//     it('should return 500 on Redis error', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockRejectedValue(new Error('Redis error'));

//       const response = await request(app).get('/details/movie/1');

//       expect(response.status).toBe(500);
//       expect(response.body.message).toBe('Internal server error');
//     });
//   });

//   describe('getSimilarContent', () => {
//     it('should return similar content', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockResolvedValue(null);
//       const fetch = jest.spyOn(require('../utils/fetch-from-TMDB'), 'fetch');
//       fetch.mockResolvedValue({ results: [{ id: 1, name: 'Similar Content' }] });

//       const response = await request(app).get('/similar/movie/1');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual([{ id: 1, name: 'Similar Content' }]);
//       expect(fetch).toHaveBeenCalledWith('/movie/1/similar?language=en-US&page=1');
//     });

//     it('should return 500 on Redis error', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockRejectedValue(new Error('Redis error'));

//       const response = await request(app).get('/similar/movie/1');

//       expect(response.status).toBe(500);
//       expect(response.body.message).toBe('Internal server error');
//     });
//   });

//   describe('searchContent', () => {
//     it('should return search results', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockResolvedValue(null);
//       const fetch = jest.spyOn(require('../utils/fetch-from-TMDB'), 'fetch');
//       fetch.mockResolvedValue({ results: [{ id: 1, name: 'Search Result' }] });

//       const response = await request(app).get('/search/test');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual({ results: [{ id: 1, name: 'Search Result' }] });
//       expect(fetch).toHaveBeenCalledWith('/search/movie?page=1&query=test');
//     });

//     it('should return 500 on Redis error', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockRejectedValue(new Error('Redis error'));

//       const response = await request(app).get('/search/test');

//       expect(response.status).toBe(500);
//       expect(response.body.message).toBe('Internal server error');
//     });
//   });

//   describe('getTreiler', () => {
//     it('should return the trailer', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockResolvedValue(null);
//       const fetch = jest.spyOn(require('../utils/fetch-from-TMDB'), 'fetch');
//       fetch.mockResolvedValue({
//         results: [{ id: 1, type: 'Trailer', name: 'Official Trailer' }],
//       });

//       const response = await request(app).get('/treiler/movie/1');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual({ id: 1, type: 'Trailer', name: 'Official Trailer' });
//     });

//     it('should return 500 on Redis error', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockRejectedValue(new Error('Redis error'));

//       const response = await request(app).get('/treiler/movie/1');

//       expect(response.status).toBe(500);
//       expect(response.body.message).toBe('Internal server error');
//     });
//   });

//   describe('getContentByCategory', () => {
//     it('should return content by category', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockResolvedValue(null);
//       const fetch = jest.spyOn(require('../utils/fetch-from-TMDB'), 'fetch');
//       fetch.mockResolvedValue({ results: [{ id: 1, name: 'Category Content' }] });

//       const response = await request(app).get('/content/movie/popular');

//       expect(response.status).toBe(200);
//       expect(response.body.content).toEqual({ results: [{ id: 1, name: 'Category Content' }] });
//     });

//     it('should return 500 on Redis error', async () => {
//       const redisMock = require('redis').createClient();
//       redisMock.get.mockRejectedValue(new Error('Redis error'));

//       const response = await request(app).get('/content/movie/popular');

//       expect(response.status).toBe(500);
//       expect(response.body.message).toBe('Internal server error');
//     });
//   });
// });
