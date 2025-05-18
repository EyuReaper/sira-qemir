import { Component } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-md p-6 mx-auto mt-20 text-center bg-white rounded-lg shadow-lg dark:bg-gray-900/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20 animate-slide-in">
          <h2 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">የሆነ ስህተት ተከስቷል</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">ተግባሮችን መጫን አልተሳካም። እባክዎ እንደገና ይሞክሩ።</p>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-500 glow-on-hover"
          >
            እንደገና ሞክር
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Tasks({ onSubmit, tasks = [], onDelete, onEdit }) {
  return (
    <ErrorBoundary>
      <div>
        <TaskForm onSubmit={onSubmit} />
        <TaskList tasks={tasks} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </ErrorBoundary>
  );
}

export default Tasks;