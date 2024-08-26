import request from 'supertest';
import express, { Application } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { AuthService } from '../services/auth-service';

// Mock the AuthService
jest.mock('../services/auth-service');

const app: Application = express();
app.use(express.json());

// Set up routes
app.post('/login', AuthController.login);
app.post('/register', AuthController.register);
app.post('/logout', AuthController.logout);
app.post('/refresh-token', AuthController.refreshToken);
app.post('/request-password-reset', AuthController.requestPasswordReset);
app.post('/reset-password', AuthController.resetPassword);

describe('AuthController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('login', () => {
    it('should return a successful login response', async () => {
      (AuthService.login as jest.Mock).mockResolvedValue({ token: 'test-token' });

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('test-token');
    });

    it('should handle errors during login', async () => {
      (AuthService.login as jest.Mock).mockRejectedValue(new Error('Login failed'));

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(500);
    });
  });

  describe('register', () => {
    it('should return a successful registration response', async () => {
      (AuthService.register as jest.Mock).mockResolvedValue({ userId: 'test-user-id' });

      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(201);
      expect(response.body.userId).toBe('test-user-id');
    });

    it('should handle errors during registration', async () => {
      (AuthService.register as jest.Mock).mockRejectedValue(new Error('Registration failed'));

      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(500);
    });
  });

  describe('logout', () => {
    it('should return 204 if logout is successful', async () => {
      (AuthService.logout as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/logout')
        .send({ userId: 'test-user-id' });

      expect(response.status).toBe(204);
    });

    it('should return 400 if userId is missing', async () => {
      const response = await request(app)
        .post('/logout')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User ID is required in the request body!');
    });

    it('should handle errors during logout', async () => {
      (AuthService.logout as jest.Mock).mockRejectedValue(new Error('Logout failed'));

      const response = await request(app)
        .post('/logout')
        .send({ userId: 'test-user-id' });

      expect(response.status).toBe(500);
    });
  });

  describe('refreshToken', () => {
    it('should return a new token if refreshToken is valid', async () => {
      (AuthService.refreshToken as jest.Mock).mockResolvedValue({ token: 'new-token' });

      const response = await request(app)
        .post('/refresh-token')
        .send({ refreshToken: 'valid-refresh-token' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('new-token');
    });

    it('should return 400 if refreshToken is missing', async () => {
      const response = await request(app)
        .post('/refresh-token')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Refresh token is required in the request body!');
    });

    it('should handle errors during token refresh', async () => {
      (AuthService.refreshToken as jest.Mock).mockRejectedValue(new Error('Refresh token failed'));

      const response = await request(app)
        .post('/refresh-token')
        .send({ refreshToken: 'valid-refresh-token' });

      expect(response.status).toBe(500);
    });
  });

  describe('requestPasswordReset', () => {
    it('should send a reset password email', async () => {
      (AuthService.requestPasswordReset as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/request-password-reset')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('If an account with that email exists, a password reset link has been sent.');
    });

    it('should handle errors during password reset request', async () => {
      (AuthService.requestPasswordReset as jest.Mock).mockRejectedValue(new Error('Request password reset failed'));

      const response = await request(app)
        .post('/request-password-reset')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(500);
    });
  });

  describe('resetPassword', () => {
    it('should reset the password successfully', async () => {
      (AuthService.resetPassword as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/reset-password')
        .send({ token: 'valid-token', newPassword: 'new-password' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Password reset successful.');
    });

    it('should handle errors during password reset', async () => {
      (AuthService.resetPassword as jest.Mock).mockRejectedValue(new Error('Password reset failed'));

      const response = await request(app)
        .post('/reset-password')
        .send({ token: 'valid-token', newPassword: 'new-password' });

      expect(response.status).toBe(500);
    });
  });
});
