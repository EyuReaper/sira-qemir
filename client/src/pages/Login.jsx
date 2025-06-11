import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi'; // Using react-icons for input icons

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { success, error: loginError } = await login(email, password);
    
    setLoading(false);

    if (!success) {
      setError(loginError || 'Login failed. Please check your email and password.');
    } else {
      navigate('/tasks'); // Redirect to tasks on successful login
    }
  };

  return (
    // Main container with a gradient background, covering the full screen
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      {/* Glassmorphic form container */}
      <div 
        className="w-full max-w-md p-8 space-y-8 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            ግባ
          </h2>
          <p className="mt-2 text-white/80">ወደ ሥራቀምር መግቢያ </p>
        </div>

        {/* Error message styling */}
        {error && (
          <div className="p-3 text-center text-white bg-red-500/50 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute w-5 h-5 text-white/50 top-3 left-3" />
            <input
              type="email"
              placeholder="ኢሜይል"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-white bg-transparent border-b-2 border-white/20 focus:outline-none focus:border-pink-400 placeholder:text-white/60 transition-colors"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute w-5 h-5 text-white/50 top-3 left-3" />
            <input
              type="password"
              placeholder="የይለፍ ቃል"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-white bg-transparent border-b-2 border-white/20 focus:outline-none focus:border-pink-400 placeholder:text-white/60 transition-colors"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 font-bold text-purple-600 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:bg-white/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 disabled:bg-gray-400 disabled:scale-100"
          >
            {loading ? 'በመግባት ላይ...' : 'ግባ'}
          </button>
        </form>

        <p className="text-sm text-center text-white/80">
          አካውንት የለዎትም?{' '}
          <Link to="/register" className="font-bold text-white hover:underline">
            ይመዝገቡ
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;