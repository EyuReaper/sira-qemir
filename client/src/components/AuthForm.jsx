import { useState } from 'react';

function AuthForm({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to Supabase auth 
    console.log({ email, password, type });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {type === 'login' ? 'መግባት' : 'መመዝገብ'}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">ኢሜይል</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">የይለፍ ቃል</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {type === 'login' ? 'መግባት' : 'መመዝገብ'}
      </button>
    </form>
  );
}

export default AuthForm;