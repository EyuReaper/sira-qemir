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
    <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto bg-white rounded shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        {type === 'login' ? 'መግባት' : 'መመዝገብ'}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-900 dark:text-white">ኢሜይል</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-900 dark:text-white">የይለፍ ቃል</label>
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
        className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {type === 'login' ? 'መግባት' : 'መመዝገብ'}
      </button>
    </form>
  );
}

export default AuthForm;