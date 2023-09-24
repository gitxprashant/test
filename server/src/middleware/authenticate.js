dotenv.config();
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const secretKey = process.env.secretKey;

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // if the token is invalid
      }
      req.userEmail = user.email;
      next();
    });
  }

export default authenticateToken;