import { authMiddleware } from './middleware/auth';

const handler = async (req, res) => {
  res.status(200).json({ message: `Hello ${req.user.email}, you can checkout!` });
};

export default authMiddleware(handler);