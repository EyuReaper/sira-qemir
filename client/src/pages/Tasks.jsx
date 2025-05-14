import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Tasks() {
  return (
    <div className="py-12">
      <TaskForm />
      <div className="mt-8">
        <TaskList />
      </div>
    </div>
  );
}

export default Tasks;