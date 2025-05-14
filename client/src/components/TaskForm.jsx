import { useState } from 'react';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, dueDate, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-10 mx-auto shadow-2xl glass rounded-2xl animate-slide-in">
      <h2 className="mb-8 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ethiopianBlue to-ethiopianGreen">
        ተግባር ጨምር
      </h2>
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700 dark:text-gray-200">ርዕስ</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 text-gray-900 transition duration-300 border-none rounded-lg bg-white/50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-neonBlue glow-on-hover"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700 dark:text-gray-200">መግለጫ</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 text-gray-900 transition duration-300 border-none rounded-lg bg-white/50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-neonBlue glow-on-hover"
        ></textarea>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700 dark:text-gray-200">የመጠናቀቂያ ቀን</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-4 text-gray-900 transition duration-300 border-none rounded-lg bg-white/50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-neonBlue glow-on-hover"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700 dark:text-gray-200">ቅድሚያ</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-4 text-gray-900 transition duration-300 border-none rounded-lg bg-white/50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-neonBlue glow-on-hover"
        >
          <option value="low">ዝቅተኛ</option>
          <option value="medium">መካከለኛ</option>
          <option value="high">ከፍተኛ</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-4 text-white transition duration-300 transform bg-gradient-to-r from-ethiopianBlue via-ethiopianGreen to-ethiopianYellow rounded-xl hover:from-blue-700 hover:to-yellow-600 hover:scale-105 hover:shadow-xl animate-pulse-slow"
      >
        ተግባር ጨምር
      </button>
    </form>
  );
}

export default TaskForm;