import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateLogoutBody = (req: Request, res: Response, next: NextFunction) => {

    if (!req.body || typeof req.body.userId !== 'string') {
        return res.status(400).json({ message: 'Invalid request body. User ID is required and must be a string!' });
    }
    next();
}

export const validateLoginBody = [
    check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]


export const validateRegisterBody = [
    check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email must be valid'),
  
    check('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];


  export const validateForLogoutBody = [
    check('userId')
      .notEmpty().withMessage('User ID is required')
      .isString().withMessage('User ID must be a string'),
  
    check('refreshToken')
      .notEmpty().withMessage('Refresh Token is required')
      .isString().withMessage('Refresh Token must be a string'),
  
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];