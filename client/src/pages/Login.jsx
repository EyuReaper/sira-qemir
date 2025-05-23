import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    console.log('Login attempt:', { email: trimmedEmail, password: trimmedPassword });
    try {
      await login(trimmedEmail, trimmedPassword);
      navigate('/tasks');
    } catch (err) {
      console.error('Login failed:', err.message, err); // Line 20
      setError(err.message === 'Invalid login credentials' ? 'የተሳሳተ ኢሜይል ወይም የይለፍ ቃል' : err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20 animate-slide-in">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">መግባት</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="email">
              ኢሜይል
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="password">
              የይለፍ ቃል
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && (
            <p className="mb-4 text-center text-red-500 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-500 glow-on-hover"
          >
            ግባ
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          መለያ የለህም?{' '}
          <Link to="/register" className="text-blue-600 dark:text-cyan-400 hover:underline">
            አሁን መዝገብ
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;