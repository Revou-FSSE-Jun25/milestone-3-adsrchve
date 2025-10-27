import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login, isLoggedIn } from '../utils/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace('/checkout');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 text-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">RevoShop Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Back to <a href="/" className="text-blue-500 hover:underline">homepage</a>
        </p>
      </div>
    </div>
  );
}
