import { useState } from 'react';

function TaskForm({ onSubmit, onCancel, initialTask = {} }) {
  const [title, setTitle] = useState(initialTask.title || '');
  const [description, setDescription] = useState(initialTask.description || '');
  const [dueDate, setDueDate] = useState(initialTask.due_date || '');
  const [priority, setPriority] = useState(initialTask.priority || 'low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('የተግባር ርዕስ ያስፈልጋል');
      return;
    }
    onSubmit({ title, description, dueDate, priority });
    if (!initialTask.id) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('low');
    }
    onCancel(); // Hide form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-6 mx-auto rounded-lg shadow-lg bg-white/80 dark:bg-gray-900/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20 animate-slide-in"
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {initialTask.id ? 'ተግባር አስተካክል' : 'አዲስ ተግባር ጨምር'}
      </h2>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="title">
          ርዕስ
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="description">
          መግለጫ
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="dueDate">
          የማብቂያ ቀን
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="priority">
          ቅድሚያ
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">ዝቅተኛ</option>
          <option value="medium">መካከለኛ</option>
          <option value="high">ከፍተኛ</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-500 glow-on-hover"
        >
          {initialTask.id ? 'አስተካክል' : 'ጨምር'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-gray-700 transition bg-gray-300 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          ሰርዝ
        </button>
      </div>
    </form>
  );
}

export default TaskForm;