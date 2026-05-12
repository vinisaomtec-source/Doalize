import { Router } from 'express';

import ChatController from '../controllers/ChatController.js';

import authMiddleware from '../middlewares/authMiddleware.js';


const chatRoutes = Router();


// TODAS AS ROTAS PRECISAM DE AUTH
chatRoutes.use(authMiddleware);


// LISTAR CONVERSAS
chatRoutes.get(
  '/',
  ChatController.getConversations
);


// LISTAR MENSAGENS
chatRoutes.get(
  '/messages/:receiverId',
  ChatController.getMessages
);


// ENVIAR MENSAGEM
chatRoutes.post(
  '/send',
  ChatController.sendMessage
);


export default chatRoutes;