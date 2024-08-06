import express from 'express';
import { AuthController } from '../controllers/auth-controller';
import { validateLogoutBody  } from '../middleware/validateRequestBody';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', validateLogoutBody, AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

export default router;