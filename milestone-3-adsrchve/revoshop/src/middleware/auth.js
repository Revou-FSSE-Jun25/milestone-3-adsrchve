import jwt from 'jsonwebtoken';

const SECRET_KEY = 'REVOSHOP_SECRET_KEY';

export const authMiddleware = (handler) => async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // attach user info ke request
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
