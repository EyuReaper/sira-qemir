import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div className="max-w-md p-6 mx-auto text-center rounded-lg shadow-lg bg-white/30 dark:bg-gray-900/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20">
      <h2 className="mb-4 text-xl font-bold text-red-600 dark:text-red-400">የሆነ ስህተት ተከስቷል</h2>
      <p className="text-gray-700 dark:text-gray-300">{error.message}</p>
    </div>
  );
}

function Tasks({ onSubmit, tasks, onDelete, onEdit }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative min-h-screen">
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-gray-900/70">
            <TaskForm onSubmit={onSubmit} onCancel={toggleForm} />
          </div>
        )}
        <TaskList tasks={tasks} onDelete={onDelete} onEdit={onEdit} />
        <button
          onClick={toggleForm}
          className="fixed z-50 p-4 text-white transition bg-blue-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-500 glow-on-hover"
          aria-label="አዲስ ተግባር ጨምር"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </ErrorBoundary>
  );
}

export default Tasks;