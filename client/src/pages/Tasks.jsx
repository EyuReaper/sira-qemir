import { Component } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-center text-red-600">ተግባሮችን መጫን አልተሳካም። እባክዎ እንደገና ይሞክሩ።</p>;
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