import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskSubmit = (task) => {
    setTasks([...tasks, { ...task, status: 'pending' }]);
    console.log('New task:', task);
  };

  const handleTaskDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

   const handleTaskEdit = (index, updatedTask) => {
    setTasks(tasks.map((task, i) => (i === index ? updatedTask : task)));
    console.log('Edited task:', updatedTask);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-500 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
          <Header />
          <main className="container px-6 py-12 mx-auto max-w-7xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tasks" element={<Tasks onSubmit={handleTaskSubmit} tasks={tasks} onDelete={handleTaskDelete} onEdit={handleTaskEdit} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;