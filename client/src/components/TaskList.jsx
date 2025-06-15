import { useState, useEffect } from 'react'; // Added useEffect for potential future enhancements related to initial state/focus
import TaskForm from './TaskForm'; // Assuming TaskForm is in the same directory or a sibling folder now based on previous discussions. Adjust path if necessary.

function TaskList({ tasks = [], onDelete, onEdit }) {
  const [editingTask, setEditingTask] = useState(null);
  const [hideCompleted, setHideCompleted] = useState(false);

  // Memoize handleEdit to prevent unnecessary re-renders if passed down
  const handleEdit = (taskToEdit) => { // Changed to pass the task object directly for clarity
    setEditingTask(taskToEdit); // Store the entire task object for editing
  };

  const handleSave = async (updatedTask) => {
    // The onEdit function from App.jsx now expects taskId and updatedTask.
    // We need to pass editingTask.id and the new updatedTask object.
    const result = await onEdit(editingTask.id, updatedTask);
    if (result.success) {
      setEditingTask(null); // Close the modal only on successful save
    } else {
      // Optionally show an error message to the user
      console.error("Failed to save task:", result.error);
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  const handleToggleStatus = async (task) => {
    // Toggle status between 'pending' and 'completed'
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    const updatedTask = { ...task, status: newStatus };
    await onEdit(task.id, updatedTask); // Pass task ID and updated object
  };

  // Filter tasks based on hideCompleted state
  const filteredTasks = hideCompleted
    ? tasks.filter(task => task.status !== 'completed')
    : tasks;

  return (
    <div className="w-full max-w-4xl py-8 mx-auto"> {/* Increased max-width for more space */}
      {/* Section Title */}
      <h2 className="mb-8 text-4xl font-extrabold text-center text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-cyan-400 dark:to-blue-300 animate-fade-in-up">
        የእርስዎ ተግባራት
      </h2>

      {/* Filter Checkbox */}
      <div className="flex items-center justify-end px-4 mb-6 sm:px-0">
        <input
          type="checkbox"
          id="hideCompleted"
          checked={hideCompleted}
          onChange={(e) => setHideCompleted(e.target.checked)}
          className="w-5 h-5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer dark:text-cyan-400 focus:ring-blue-500 dark:focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700"
        />
        <label htmlFor="hideCompleted" className="text-lg font-medium text-gray-700 cursor-pointer select-none dark:text-gray-300">
          የተጠናቀቁትን ደብቅ
        </label>
      </div>

      {/* Conditional rendering for Task List or "No Tasks" message */}
      {filteredTasks.length === 0 ? (
        <div className="p-10 text-center transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl animate-scale-in">
          <p className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-400">ምንም የሚታዩ ተግባራት የሉም።</p>
          {hideCompleted && tasks.length > 0 && (
             <p className="text-lg text-gray-500 dark:text-gray-500">የተጠናቀቁትን ተግባራት በማሳየት ማየት ይችላሉ።</p>
          )}
          {!hideCompleted && tasks.length === 0 && (
             <p className="text-lg text-gray-500 dark:text-gray-500">አዲስ ተግባር ለመጨመር ከታች ያለውን '+' ቁልፍ ይጫኑ።</p>
          )}
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-fade-in-delay"> {/* Responsive grid layout */}
          {filteredTasks.map((task) => ( // Use task.id as key for better React performance
            <li
              key={task.id} // Use unique ID as key
              className={`
                relative p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl
                ${task.status === 'completed'
                  ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 border border-green-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 opacity-80'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                }
              `}
            >
              {/* Priority Badge */}
              <span className={`
                absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full
                ${task.priority === 'high' ? 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100' : ''}
                ${task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' : ''}
                ${task.priority === 'low' ? 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100' : ''}
              `}>
                {task.priority === 'high' ? 'ከፍተኛ' : task.priority === 'medium' ? 'መካከለኛ' : 'ዝቅተኛ'}
              </span>

              <div>
                <h3 className={`mb-2 text-xl font-bold ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                  {task.title}
                </h3>
                {task.description && ( // Only display description if it exists
                  <p className={`text-gray-600 dark:text-gray-300 text-sm mb-2 ${task.status === 'completed' ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
                <p className={`text-gray-600 dark:text-gray-300 text-sm ${task.status === 'completed' ? 'line-through' : ''}`}>
                  <span className="font-medium">ሁኔታ:</span> {task.status === 'pending' ? 'በመጠባበቅ ላይ' : task.status === 'completed' ? 'ተጠናቋል' : 'ያልተገለፀ'}
                </p>
                <p className={`text-gray-600 dark:text-gray-300 text-sm ${task.status === 'completed' ? 'line-through' : ''}`}>
                  <span className="font-medium">የመጠናቀቂያ ቀን:</span> {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'ያልተወሰነ'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end gap-3 mt-4"> {/* Use gap for spacing */}
                <button
                  onClick={() => handleToggleStatus(task)} // Pass the task object
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2
                    ${task.status === 'completed'
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:ring-yellow-300'
                      : 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600 focus:ring-green-300'
                    }
                  `}
                >
                  {task.status === 'completed' ? 'ተጠናቀቀ' : 'ጨርስ'}
                </button>
                <button
                  onClick={() => handleEdit(task)} // Pass the task object
                  className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-cyan-300"
                >
                  አስተካክል
                </button>
                <button
                  onClick={() => onDelete(task.id)} // Pass task.id directly
                  className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-300"
                >
                  አስወግድ
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-gray-900/80 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCancel();
            }
          }}
        >
          <div className="relative w-full max-w-md p-6 transition-all duration-300 ease-out transform scale-95 bg-white rounded-lg shadow-2xl dark:bg-gray-800 md:scale-100 animate-slide-up">
            <button
              onClick={handleCancel}
              className="absolute p-1 text-gray-500 rounded-full top-3 right-3 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="ዝጋ"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">ተግባር አስተካክል</h3>
            {/* TaskForm for editing */}
            <TaskForm initialTask={editingTask} onSubmit={handleSave} onCancel={handleCancel} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;