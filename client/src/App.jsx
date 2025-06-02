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

    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (error) {
          console.error('Error fetching tasks:', error.message, error);
          throw error;
        }
        setTasks(data || []);
      } catch (error) {
        console.error('Fetch tasks failed:', error.message, error);
      }
    };

    fetchTasks();

    const channel = supabase
      .channel('tasks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${user.id}` },
        (payload) => {
          try {
            if (payload.eventType === 'INSERT') {
              setTasks((prev) => [payload.new, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setTasks((prev) =>
                prev.map((task) => (task.id === payload.new.id ? payload.new : task))
              );
            } else if (payload.eventType === 'DELETE') {
              setTasks((prev) => prev.filter((task) => task.id !== payload.old.id));
            }
          } catch (error) {
            console.error('Real-time update error:', error.message, error);
          }
        }
      )
      .subscribe((status, error) => {
        if (error) {
          console.error('Subscription error:', error.message, error);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, loading]);

  const handleTaskSubmit = async (task) => {
    if (!user) {
      console.error('No user authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    const taskData = {
      title: task.title?.trim(),
      description: task.description?.trim() || null,
      due_date: task.dueDate || null,
      priority: ['low', 'medium', 'high'].includes(task.priority) ? task.priority : 'low',
      user_id: user.id,
      status: 'pending',
    };

    if (!taskData.title) {
      console.error('Task title is required');
      return { success: false, error: 'Task title is required' };
    }

    console.log('Submitting task:', taskData);
    console.log('User ID:', user.id);

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select()
        .single();
      if (error) {
        console.error('Error adding task:', error.message, error);
        return { success: false, error: error.message };
      }
      console.log('New task:', data);
      return { success: true, task: data };
    } catch (error) {
      console.error('Add task failed:', error.message, error);
      return { success: false, error: error.message };
    }
  };

  const handleTaskDelete = async (index) => {
    const taskId = tasks[index].id;
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId);
      if (error) {
        console.error('Error deleting task:', error.message, error);
        throw error;
      }
      return { success: true };
    } catch (error) {
      console.error('Delete task failed:', error.message, error);
      return { success: false, error: error.message };
    }
  };

  const handleTaskEdit = async (index, updatedTask) => {
    const taskId = tasks[index].id;
    const updatedTaskData = {
      title: updatedTask.title?.trim(),
      description: updatedTask.description?.trim() || null,
      due_date: updatedTask.dueDate || null,
      priority: ['low', 'medium', 'high'].includes(updatedTask.priority) ? updatedTask.priority : 'low',
      status: ['pending', 'completed'].includes(updatedTask.status) ? updatedTask.status : 'pending',
      updated_at: new Date().toISOString(),
    };

    if (!updatedTaskData.title) {
      console.error('Task title is required');
      return { success: false, error: 'Task title is required' };
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updatedTaskData)
        .eq('id', taskId)
        .select()
        .single();
      if (error) {
        console.error('Error updating task:', error.message, error);
        throw error;
      }
      console.log('Edited task:', data);
      return { success: true, task: data };
    } catch (error) {
      console.error('Update task failed:', error.message, error);
      return { success: false, error: error.message };
    }
  };

  if (loading) {
    return <div className="mt-20 text-center text-gray-600 dark:text-gray-300">በመጫን ላይ...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Header />
      <main className="container flex-1 px-6 py-12 mx-auto max-w-7xl">
        <Routes>
         <Route path="/" element={<Home />} />
          <Route
            path="/tasks"
            element={
              user ? (
                <Tasks
                  onSubmit={handleTaskSubmit}
                  tasks={tasks}
                  onDelete={handleTaskDelete}
                  onEdit={handleTaskEdit}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
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
      <footer className="w-full p-4 text-center text-gray-700 bg-gray-200 dark:bg-gray-800 dark:text-gray-300">
        በ ❤️ የተሰራ በ እዩእል ጌታቸው <br />
        © Eyuel Getachew 2025
      </footer>
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