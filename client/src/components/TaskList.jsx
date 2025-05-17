import { useState } from 'react';

function TaskList({ tasks = [], onDelete, onEdit }) {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (index) => {
    setEditingTask({ index, ...tasks[index] });
  };

  const handleSave = (updatedTask) => {
    onEdit(editingTask.index, updatedTask);
    setEditingTask(null);
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10">
      <h2 className="mb-8 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-cyan-400 dark:to-yellow-300 animate-slide-in">
        ተግባራት
      </h2>
      {tasks.length === 0 ? (
        <p className="text-lg text-gray-600 dark:text-gray-400 animate-slide-in-delay">ምንም ተግባራት የሉም</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-6 transition duration-300 bg-white shadow-md rounded-2xl dark:bg-gray-900/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20 hover:shadow-xl animate-slide-in-delay glow-on-hover"
            >
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ሁኔታ: {task.status === 'pending' ? 'በመጠባበቅ ላይ' : task.status === 'completed' ? 'ተጠናቋል' : 'ያልተገለፀ'}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  የመጠናቀቂያ ቀን: {task.dueDate || 'ያልተወሰነ'}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  ቅድሚያ: {task.priority === 'high' ? 'ከፍተኛ' : task.priority === 'medium' ? 'መካከለኛ' : 'ዝቅተኛ'}
                </p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-4 py-2 text-gray-900 transition duration-300 bg-yellow-300 rounded-lg hover:bg-yellow-400 dark:bg-yellow-400 dark:hover:bg-yellow-500 glow-on-hover"
                >
                  አስተካክል
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="px-4 py-2 text-white transition duration-300 bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 glow-on-hover"
                >
                  አስወግድ
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20 animate-slide-in">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">ተግባር አስተካክል</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(editingTask); }} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">ርዕስ</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover"
                  placeholder="የተግባር ርዕስ"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">መግለጫ</label>
                <textarea
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover"
                  placeholder="የተግባር መግለጫ"
                  rows="4"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">የማብቂያ ቀን</label>
                <input
                  type="date"
                  value={editingTask.dueDate || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">ቅድሚያ</label>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover"
                >
                  <option value="low">ዝቅተኛ</option>
                  <option value="medium">መካከለኛ</option>
                  <option value="high">ከፍተኛ</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">ሁኔታ</label>
                <select
                  value={editingTask.status}
                  onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover"
                >
                  <option value="pending">በመጠባበቅ ላይ</option>
                  <option value="completed">ተጠናቋል</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 transition duration-300 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                >
                  ሰርዝ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white transition duration-300 rounded-lg bg-cyan-600 hover:bg-cyan-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 glow-on-hover"
                >
                  አስቀምጥ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;