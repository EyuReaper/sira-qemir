import { useState, useCallback } from 'react'; // Added useCallback for memoizing toggleForm
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { ErrorBoundary } from 'react-error-boundary';

// Error Fallback Component - styled for better visual integration
function ErrorFallback({ error }) {
  return (
    <div
      role="alert" // ARIA role for accessibility
      className="flex flex-col items-center justify-center min-h-[200px] p-8 mx-auto my-8 max-w-lg text-center rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 transition-colors duration-300"
    >
      <h2 className="mb-4 text-3xl font-extrabold text-red-700 dark:text-red-400">
        <span role="img" aria-label="Warning">⚠️</span> የሆነ ስህተት ተከስቷል!
      </h2>
      <p className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
        {error.message || 'ያልታወቀ ስህተት ተከስቷል።'} {/* Provide a fallback message */}
      </p>
      <p className="text-gray-500 text-md dark:text-gray-400">
        እባክዎ ገጹን እንደገና ለመጫን ይሞክሩ ወይም በኋላ እንደገና ይመለሱ።
      </p>
    </div>
  );
}

// Main Tasks Component
function Tasks({ onSubmit, tasks, onDelete, onEdit }) {
  const [showForm, setShowForm] = useState(false);

  // Memoize toggleForm to prevent unnecessary re-renders in child components if passed down
  const toggleForm = useCallback(() => {
    setShowForm((prevShowForm) => !prevShowForm);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative min-h-[calc(100vh-160px)] flex flex-col items-center py-4 sm:py-8">
        {/* Task Form Modal */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-gray-900/80 backdrop-blur-sm animate-fade-in"
            // Optional: Close modal on backdrop click
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                toggleForm();
              }
            }}
          >
            <div className="relative w-full max-w-md p-6 transition-all duration-300 ease-out transform scale-95 bg-white rounded-lg shadow-2xl dark:bg-gray-800 md:scale-100 animate-slide-up">
              <button
                onClick={toggleForm}
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
              <TaskForm onSubmit={onSubmit} onCancel={toggleForm} />
            </div>
          </div>
        )}

        {/* Task List Section */}
        <div className="flex-grow w-full">
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} onDelete={onDelete} onEdit={onEdit} />
          ) : (
            <div className="p-8 mt-10 text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h3 className="mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">ምንም ተግባራት የሉም!</h3>
              <p className="text-gray-600 dark:text-gray-400">አዲስ ተግባር ለማከል ከታች ያለውን '+' ቁልፍ ይጠቀሙ።</p>
              <button
                onClick={toggleForm}
                className="px-6 py-3 mt-6 text-white transition-all duration-200 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-cyan-500 dark:hover:bg-cyan-600"
              >
                አዲስ ተግባር ይፍጠሩ
              </button>
            </div>
          )}
        </div>


        {/* Floating Action Button (FAB) */}
        <button
          onClick={toggleForm}
          className="fixed z-40 p-4 text-white transition-all duration-300 ease-in-out transform bg-blue-600 rounded-full shadow-lg bottom-6 right-6 md:p-5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:focus:ring-cyan-800 hover:scale-110 active:scale-95"
          aria-label="አዲስ ተግባር ጨምር"
          title="አዲስ ተግባር ጨምር" // Tooltip for accessibility
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 md:w-8 md:h-8" // Larger icon for FAB
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