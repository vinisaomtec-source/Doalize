import { Router }
  from 'express';

import UploadController
  from '../controllers/UploadController.js';

import authMiddleware
  from '../middlewares/authMiddleware.js';

import upload
  from '../middlewares/uploadMiddleware.js';

const uploadRoutes =
  Router();

uploadRoutes.post(
  '/',
  authMiddleware,
  upload.single('file'),
  (req, res, next) => {

    console.log(
      'ARQUIVO:',
      req.file
    );

    next();
  },
  UploadController.upload
);

export default uploadRoutes;