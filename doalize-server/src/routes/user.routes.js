import { Router } from 'express';

import UserController from '../controllers/UserController.js';

import authMiddleware from '../middlewares/authMiddleware.js';


const userRoutes = Router();


// TODAS AS ROTAS PRIVADAS
userRoutes.use(authMiddleware);


// PERFIL
userRoutes.get(
  '/profile',
  UserController.profile
);


// ATUALIZAR USUÁRIO
userRoutes.put(
  '/update',
  UserController.update
);


// EXCLUIR CONTA
userRoutes.delete(
  '/delete',
  UserController.delete
);


export default userRoutes;