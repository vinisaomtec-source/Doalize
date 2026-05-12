import { Router } from 'express';

import PostController from '../controllers/PostController.js';

import authMiddleware from '../middlewares/authMiddleware.js';


const postRoutes = Router();


// LISTAR POSTS
postRoutes.get(
  '/',
  PostController.index
);


// DETALHES DO POST
postRoutes.get(
  '/:id',
  PostController.show
);


// ROTAS PRIVADAS
postRoutes.use(authMiddleware);


// CRIAR POST
postRoutes.post(
  '/',
  PostController.store
);


// PROMOVER POST
postRoutes.patch(
  '/promote/:id',
  PostController.promote
);


// DELETAR POST
postRoutes.delete(
  '/:id',
  PostController.delete
);


export default postRoutes;