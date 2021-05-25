import jwt from 'jsonwebtoken';
import config from '../config/default.json';

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Non auth' });
    }
    const decodedToken = jwt.verify(token, config.jwtSecret);
    req.user = decodedToken;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Non auth' });
  }
};
