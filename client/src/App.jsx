import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState, useEffect } from 'react';
import { supabase } from './context/AuthContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

function AppContent() {
  const [tasks, setTasks] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user || loading) return;

    // Fetch tasks
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }
      setTasks(data || []);
    };

    fetchTasks();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('tasks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks((prev) =>
              prev.map((task) => (task.id === payload.new.id ? payload.new : task))
            );
          } else if (payload.eventType === 'DELETE') {
            setTasks((prev) => prev.filter((task) => task.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [user, loading]);

  const handleTaskSubmit = async (task) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...task, user_id: user.id, status: 'pending' }])
      .select()
      .single();
    if (error) {
      console.error('Error adding task:', error);
      return;
    }
    console.log('New task:', data);
  };

  const handleTaskDelete = async (index) => {
    const taskId = tasks[index].id;
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
      console.error('Error deleting task:', error);
      return;
    }
  };

  const handleTaskEdit = async (index, updatedTask) => {
    const taskId = tasks[index].id;
    const { data, error } = await supabase
      .from('tasks')
      .update({ ...updatedTask, updated_at: new Date().toISOString() })
      .eq('id', taskId)
      .select()
      .single();
    if (error) {
      console.error('Error updating task:', error);
      return;
    }
    console.log('Edited task:', data);
  };

  if (loading) {
    return <div className="mt-20 text-center text-gray-600 dark:text-gray-300">በመጫን ላይ...</div>;
  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Header />
      <main className="container px-6 py-12 mx-auto max-w-7xl">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/tasks"
            element={user ? <Tasks onSubmit={handleTaskSubmit} tasks={tasks} onDelete={handleTaskDelete} onEdit={handleTaskEdit} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/tasks" replace />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/tasks" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;