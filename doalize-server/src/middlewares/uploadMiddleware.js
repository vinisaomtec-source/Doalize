import multer from 'multer';

import path from 'path';

import crypto from 'crypto';


// STORAGE
const storage = multer.diskStorage({

  // PASTA
  destination: (
    req,
    file,
    callback
  ) => {

    callback(null, 'uploads/');
  },


  // NOME DO ARQUIVO
  filename: (
    req,
    file,
    callback
  ) => {

    const hash =
      crypto.randomBytes(10).toString(
        'hex'
      );

    const extension =
      path.extname(file.originalname);

    const fileName =
      `${hash}${extension}`;

    callback(null, fileName);
  },
});


// FILTRO
function fileFilter(
  req,
  file,
  callback
) {

  const allowedMimes = [

    'image/jpeg',

    'image/jpg',

    'image/png',

    'image/webp',
  ];


  if (
    allowedMimes.includes(
      file.mimetype
    )
  ) {

    callback(null, true);

  } else {

    callback(
      new Error(
        'Formato inválido'
      )
    );
  }
}


// UPLOAD
const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },
});


export default upload;