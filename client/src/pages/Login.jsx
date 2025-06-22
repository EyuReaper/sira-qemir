import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'; // Add eye icons

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(''); // Use one consistent error state for the form
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // <-- Add state

  const { login } = useAuth(); // Destructure login from useAuth
  const navigate = useNavigate();

  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setFormError(''); // Clear any previous errors
    setLoading(true); // Indicate that an action is in progress

    // --- 2. Client-side Validation (MUST COME FIRST) ---
    if (!email.trim() || !password.trim()) {
      setFormError('እባክዎ ኢሜይል እና የይለፍ ቃል ያስገቡ።'); // "Please enter both email and password."
      setLoading(false); // Stop loading if validation fails
      return; // Stop the function execution
    }

    // --- 3. Log what's being sent (for debugging) ---
    console.log('Login.jsx: Attempting login with (trimmed/lowercased email):', email.trim().toLowerCase(), 'and password length:', password.length);
    // DO NOT log the actual password for security reasons in production!

    // --- 4. Call the login function (ONLY ONCE) ---
    const { success, error: loginError } = await login(email, password);

    // --- 5. Stop loading regardless of success/failure ---
    setLoading(false);

    // --- 6. Handle the result ---
    if (success) {
      console.log('Login successful!');
      navigate('/tasks'); // Redirect to tasks on successful login
    } else {
      // Use the error message from AuthContext's getFriendlyErrorMessage
      setFormError(loginError || 'መግባት አልተሳካም። እባክዎ ኢሜይልዎን እና የይለፍ ቃልዎን ያረጋግጡ።'); // "Login failed. Please check your email and password."
      console.error('Login.jsx: Login failed:', loginError);
    }
  };

  return (
    // Main container with a gradient background, covering the full screen
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      {/* Glassmorphic form container */}
      <div
        className="w-full max-w-md p-8 space-y-8 border shadow-2xl bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl border-white/20"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            ግባ
          </h2>
          <p className="mt-2 text-white/80">ወደ ሥራቀምር መግቢያ </p>
        </div>

        {/* Error message styling - Using formError */}
        {formError && (
          <div
            className="p-3 text-center text-white rounded-lg bg-red-500/50"
            aria-live="polite"
          >
            <p>{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label htmlFor="login-email" className="sr-only">
              ኢሜይል
            </label>
            <FiMail className="absolute w-5 h-5 text-white/50 top-3 left-3" />
            <input
              id="login-email"
              type="email"
              placeholder="ኢሜይል"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-white transition-colors bg-transparent border-b-2 border-white/20 focus:outline-none focus:border-pink-400 placeholder:text-white/60"
              required
              disabled={loading}
              ref={emailInputRef} // <-- Autofocus on mount
            />
          </div>

          {/* Password Input with Show/Hide */}
          <div className="relative">
            <label htmlFor="login-password" className="sr-only">
              የይለፍ ቃል
            </label>
            <FiLock className="absolute w-5 h-5 text-white/50 top-3 left-3" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="የይለፍ ቃል"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-10 pr-10 text-white transition-colors bg-transparent border-b-2 border-white/20 focus:outline-none focus:border-pink-400 placeholder:text-white/60"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute top-3 right-3 text-white/50"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "የይለፍ ቃል መደበቅ" : "የይለፍ ቃል ማሳየት"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button while loading
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