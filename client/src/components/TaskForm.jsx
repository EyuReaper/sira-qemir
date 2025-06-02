import { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    const task = { title, description, dueDate, priority };
    const result = await onSubmit(task);
    if (!result.success) {
      setError(result.error || 'Failed to add task');
      console.log('Task submission error:', result.error);
    } else {
      // Clear form on success
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('low');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">አዲስ ተግባር ጨምር</h2>
      {error && <p className="mb-4 text-red-600 dark:text-red-400">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">ርዕስ</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">መግለጫ</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">የመጨረሻ ቀን</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">ቅድሚያ</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="low">ዝቅተኛ</option>
            <option value="medium">መካከለኛ</option>
            <option value="high">ከፍተኛ</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          ጨምር
        </button>
      </form>
    </div>
  );
}

export default TaskForm;