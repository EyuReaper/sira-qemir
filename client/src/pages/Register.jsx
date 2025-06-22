import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'; // Add eye icons

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password field
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
        newErrors.email = 'ኢሜይል ያስፈልጋል';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'ኢሜይል ትክክል መሆን አለበት';
    }
    if (!formData.password) {
        newErrors.password = 'የይለፍ ቃል ያስፈልጋል';
    } else if (formData.password.length < 6) {
        newErrors.password = 'የይለፍ ቃል ቢያንስ 6 ፊደሎች መሆን አለበት';
    }
    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'የይለፍ ቃሎች መመሳሰል አለባቸው';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const { error } = await register(formData.email, formData.password);
      if (error) {
        throw error;
      }
      navigate('/tasks');
    } catch (error) {
      setServerError(error.message || 'Failed to register. The email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear validation error for the field being edited
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    }
  };

  return (
    // Main container with the same gradient background
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      {/* Glassmorphic form container */}
      <div 
        className="w-full max-w-md p-8 space-y-6 border shadow-2xl bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl border-white/20"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            ይመዝገቡ
          </h2>
          <p className="mt-2 text-white/80">ሥራቀምርን ዛሬ ይቀላቀሉ</p>
        </div>

        {/* Server error message styling */}
        {serverError && (
          <div
            className="p-3 text-center text-white rounded-lg bg-red-500/50"
            aria-live="polite"
          >
            <p>{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <label htmlFor="register-email" className="sr-only">
              ኢሜይል
            </label>
            <FiMail className={`absolute w-5 h-5 top-3 left-3 ${errors.email ? 'text-red-400' : 'text-white/50'}`} />
            <input
              id="register-email"
              type="email"
              placeholder="ኢሜይል"
              value={formData.email}
              onChange={handleChange('email')}
              className={`w-full py-3 pl-10 pr-4 text-white bg-transparent border-b-2 focus:outline-none placeholder:text-white/60 transition-colors ${errors.email ? 'border-red-500' : 'border-white/20 focus:border-pink-400'}`}
              required
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          {/* Password Input with Show/Hide */}
          <div className="relative">
            <label htmlFor="register-password" className="sr-only">
              የይለፍ ቃል
            </label>
            <FiLock className={`absolute w-5 h-5 top-3 left-3 ${errors.password ? 'text-red-400' : 'text-white/50'}`} />
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="የይለፍ ቃል"
              value={formData.password}
              onChange={handleChange('password')}
              className={`w-full py-3 pl-10 pr-10 text-white bg-transparent border-b-2 focus:outline-none placeholder:text-white/60 transition-colors ${errors.password ? 'border-red-500' : 'border-white/20 focus:border-pink-400'}`}
              required
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
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
          </div>

          {/* Confirm Password Input with Show/Hide */}
          <div className="relative">
            <label htmlFor="register-confirm-password" className="sr-only">
              የይለፍ ቃል ያረጋግጡ
            </label>
            <FiLock className={`absolute w-5 h-5 top-3 left-3 ${errors.confirmPassword ? 'text-red-400' : 'text-white/50'}`} />
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="የይለፍ ቃል ያረጋግጡ"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              className={`w-full py-3 pl-10 pr-10 text-white bg-transparent border-b-2 focus:outline-none placeholder:text-white/60 transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-white/20 focus:border-pink-400'}`}
              required
            />
            <button
              type="button"
              className="absolute top-3 right-3 text-white/50"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? "የይለፍ ቃል መደበቅ" : "የይለፍ ቃል ማሳየት"}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 mt-4 font-bold text-purple-600 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:bg-white/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 disabled:bg-gray-400 disabled:scale-100"
          >
            {loading ? 'በመመዝገብ ላይ...' : 'ይመዝገቡ'}
          </button>
        </form>

        <p className="text-sm text-center text-white/80">
          አካውንት አለዎት?{' '}
          <Link to="/login" className="font-bold text-white hover:underline">
            ግባ
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;