function TaskList({ tasks = [], onDelete }) {
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
    </div>
  );
}

export default TaskList;