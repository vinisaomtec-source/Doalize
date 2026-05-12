import { Router } from 'express';

import UploadController from '../controllers/UploadController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

import upload from '../middlewares/uploadMiddleware.js';


const uploadRoutes = Router();


// UPLOAD PRIVADO
uploadRoutes.post(
  '/',
  authMiddleware,

  upload.single('file'),

  UploadController.upload
);


export default uploadRoutes;