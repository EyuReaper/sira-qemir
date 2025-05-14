function TaskList() {
  const tasks = [
    { id: 1, title: 'ማጠብ', status: 'pending', dueDate: '2025-05-10', priority: 'high' },
    { id: 2, title: 'መማር', status: 'completed', dueDate: '2025-05-09', priority: 'medium' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="mb-8 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ethiopianBlue to-ethiopianGreen animate-slide-in">
        ተግባራት
      </h2>
      {tasks.length === 0 ? (
        <p className="text-lg text-gray-600 dark:text-gray-200">ምንም ተግባራት የሉም</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-8 transition duration-300 transform glass rounded-2xl hover:scale-102 hover:shadow-2xl animate-slide-in-delay"
            >
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                  {task.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-200">
                  ሁኔታ: {task.status === 'pending' ? 'በመጠባበቅ ላይ' : 'ተጠናቋል'}
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                  የመጠናቀቂያ ቀን: {task.dueDate}
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                  ቅድሚያ: {task.priority === 'high' ? 'ከፍተኛ' : task.priority === 'medium' ? 'መካከለኛ' : 'ዝቅተኛ'}
                </p>
              </div>
              <div className="space-x-4">
                <button className="px-4 py-2 text-gray-900 transition duration-300 transform rounded-lg bg-ethiopianYellow hover:bg-neonGreen hover:scale-110 glow-on-hover">
                  አስተካክል
                </button>
                <button className="px-4 py-2 text-white transition duration-300 transform rounded-lg bg-ethiopianRed hover:bg-red-700 hover:scale-110 glow-on-hover">
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