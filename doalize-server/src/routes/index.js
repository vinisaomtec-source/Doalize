import { Router } from 'express';

import authRoutes from './auth.routes.js';

import userRoutes from './user.routes.js';

import postRoutes from './post.routes.js';

import chatRoutes from './chat.routes.js';

import uploadRoutes from './upload.routes.js';


const routes = Router();


// AUTH
routes.use(
  '/auth',
  authRoutes
);


// USERS
routes.use(
  '/users',
  userRoutes
);


// POSTS
routes.use(
  '/posts',
  postRoutes
);


// CHAT
routes.use(
  '/chat',
  chatRoutes
);


// UPLOAD
routes.use(
  '/upload',
  uploadRoutes
);


export default routes;