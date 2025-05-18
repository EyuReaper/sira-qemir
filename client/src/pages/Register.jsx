import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'ኢሜይል ያስፈልጋል';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'ኢሜይል ትክክል መሆን አለበት';
    if (!formData.password) newErrors.password = 'የይለፍ ቃል ያስፈልጋል';
    else if (formData.password.length < 6) newErrors.password = 'የይለፍ ቃል ቢያንስ 6 ፊደሎች መሆን አለበት';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'የይለፍ ቃሎች መመሳሰል አለባቸው';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await register(formData.email, formData.password);
      navigate('/tasks');
    } catch (error) {
      setServerError('የመመዝገቢያ ስህተት፡ ' + error.message);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    setServerError('');
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg dark:bg-gray-900/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20 animate-slide-in">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">ተመዝገብ</h2>
      {serverError && <p className="mb-4 text-center text-red-500">{serverError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">ኢሜይል</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover`}
            placeholder="ኢሜይል አስገባ"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">የይለፍ ቃል</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover`}
            placeholder="የይለፍ ቃል አስገባ"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">የይለፍ ቃል አረጋግጥ</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover`}
            placeholder="የይለፍ ቃል እንደገና አስገባ"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="w-full px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-500 animate-pulse disabled:opacity-50 disabled:cursor-not-allowed glow-on-hover"
        >
          ተመዝገብ
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
        መለያ አለህ?{' '}
        <a href="/login" className="text-blue-600 hover:underline dark:text-cyan-400">ግባ</a>
      </p>
    </div>
  );
}

export default Register;