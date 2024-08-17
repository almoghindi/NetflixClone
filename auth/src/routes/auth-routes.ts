import express from 'express';
import { AuthController } from '../controllers/auth-controller';
import { validateLogoutBody, validateLoginBody, validateRegisterBody, validateForLogoutBody  } from '../middleware/validateRequestBody';

const router = express.Router();

router.post('/login', validateLoginBody, AuthController.login);
router.post('/register', validateRegisterBody, AuthController.register);
router.post('/logout', validateForLogoutBody, AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

router.post('/reset-password', AuthController.requestPasswordReset);
router.post('/reset-password-link', AuthController.resetPassword);

export default router;