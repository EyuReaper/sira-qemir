import { useState, useEffect } from 'react';

function TaskForm({ onSubmit, onCancel, initialTask = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('pending'); // 'pending' is default for new tasks
  const [error, setError] = useState(null); // State for displaying form-level errors

  // Effect to initialize form fields when initialTask changes (for editing)
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      // Format date for input type="date" (YYYY-MM-DD)
      setDueDate(initialTask.due_date ? initialTask.due_date.split('T')[0] : '');
      setPriority(initialTask.priority || 'low');
      setStatus(initialTask.status || 'pending');
    } else {
      // Reset form for creating a new task
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('low');
      setStatus('pending');
    }
    setError(null); // Clear any previous errors when initialTask changes
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Basic client-side validation
    if (!title.trim()) {
      setError('የርዕስ ቦታው ባዶ መሆን የለበትም!'); // "Title field cannot be empty!"
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || null, // Allow null for empty description
      due_date: dueDate || null, // Allow null for empty due date
      priority,
      status // Include status in taskData
    };

    // Call the onSubmit prop, which handles the actual API interaction
    const result = await onSubmit(taskData);

    if (result.success) {
      // If submission is for a new task, clear the form.
      // If it's for editing, the parent (TaskList) will close the modal.
      if (!initialTask) { // Only clear if it was a new task form
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('low');
        setStatus('pending');
      }
      onCancel(); // Close the form/modal on successful submission
    } else {
      setError(result.error || 'ተግባር መጨመር አልተሳካም።'); // "Failed to add task."
      console.error('Task submission error:', result.error);
    }
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
        {initialTask ? 'ተግባር አስተካክል' : 'አዲስ ተግባር ጨምር'}
      </h2>

      {error && (
        <div className="p-3 mb-4 text-sm text-center text-red-700 bg-red-100 border border-red-300 rounded-md dark:bg-red-900/30 dark:border-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased space between form elements */}
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            ርዕስ <span className="text-red-500">*</span> {/* Required indicator */}
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 placeholder-gray-400 transition duration-200 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
            placeholder="ተግባሩን ይፃፉ"
            required
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            መግለጫ <span className="text-xs text-gray-400">(አማራጭ)</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3" // Smaller default rows for conciseness
            className="w-full px-4 py-2 placeholder-gray-400 transition duration-200 ease-in-out border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
            placeholder="ተጨማሪ ዝርዝሮችን ያስገቡ"
          ></textarea>
        </div>

        {/* Due Date Input */}
        <div>
          <label htmlFor="dueDate" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            የማብቂያ ቀን <span className="text-xs text-gray-400">(አማራጭ)</span>
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 transition duration-200 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Priority Select */}
        <div>
          <label htmlFor="priority" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            ቅድሚያ
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 transition duration-200 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="low">ዝቅተኛ</option>
            <option value="medium">መካከለኛ</option>
            <option value="high">ከፍተኛ</option>
          </select>
        </div>

        {/* Status Select (only visible for editing existing tasks) */}
        {initialTask && (
          <div>
            <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              ሁኔታ
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 transition duration-200 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="pending">በመጠባበቅ ላይ</option>
              <option value="completed">ተጠናቋል</option>
            </select>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            type="button" // Important: type="button" to prevent form submission
            onClick={onCancel}
            className="px-5 py-2 text-gray-700 transition-all duration-200 ease-in-out bg-gray-200 rounded-md dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            ሰርዝ
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-white transition-all duration-200 ease-in-out bg-blue-600 rounded-md dark:bg-cyan-500 hover:bg-blue-700 dark:hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
          >
            {initialTask ? 'አስቀምጥ' : 'ጨምር'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;