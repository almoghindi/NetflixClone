import express from 'express';
import { AuthController } from '../controllers/auth-controller';


const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
router.post('/refreshToken', AuthController.refreshToken);

export default router;