import { Router } from 'express';

import AuthController from '../controllers/AuthController.js';


const authRoutes = Router();


// REGISTER
authRoutes.post(
  '/register',
  AuthController.register
);


// LOGIN
authRoutes.post(
  '/login',
  AuthController.login
);


export default authRoutes;