import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';


dotenv.config();


export default function authMiddleware(
  req,
  res,
  next
) {

  try {

    // TOKEN
    const authHeader =
      req.headers.authorization;


    if (!authHeader) {

      return res.status(401).json({
        message:
          'Token não informado',
      });
    }


    // FORMATO
    const parts =
      authHeader.split(' ');

    if (parts.length !== 2) {

      return res.status(401).json({
        message:
          'Token inválido',
      });
    }


    const [scheme, token] = parts;


    // BEARER
    if (
      !/^Bearer$/i.test(scheme)
    ) {

      return res.status(401).json({
        message:
          'Token mal formatado',
      });
    }


    // VERIFICAR TOKEN
    jwt.verify(
      token,
      process.env.JWT_SECRET,

      (error, decoded) => {

        if (error) {

          return res.status(401).json({
            message:
              'Token inválido ou expirado',
          });
        }


        // USER ID
        req.userId = decoded.id;


        return next();
      }
    );

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        'Erro na autenticação',
    });
  }
}