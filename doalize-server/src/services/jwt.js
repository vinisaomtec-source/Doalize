import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';


dotenv.config();


// GERAR TOKEN
export function generateToken(userId) {

  return jwt.sign(

    {
      id: userId,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: '7d',
    }
  );
}


// VALIDAR TOKEN
export function verifyToken(token) {

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return decoded;

  } catch (error) {

    return null;
  }
}