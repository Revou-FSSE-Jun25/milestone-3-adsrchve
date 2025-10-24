import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'REVOSHOP_SECRET_KEY'; // simpan di .env

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/users');
    const users = await response.json();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || 'user' },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
