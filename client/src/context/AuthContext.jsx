import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Error: Supabase URL or Anon Key is missing. Check .env file.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
          throw error;
        }
        setUser(session?.user ?? null);
        console.log('Current session:', session);
        if (session?.access_token) {
          console.log('JWT:', session.access_token);
        }
      } catch (error) {
        console.error('Session fetch failed:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      console.log('Auth state changed:', session);
      if (session?.access_token) {
        console.log('JWT:', session.access_token);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email, passwordLength: password.length });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Login error:', error, { code: error.code, status: error.status });
        throw error;
      }
      setUser(data.user);
      console.log('Logged in user:', data.user);
      console.log('Session:', data.session);
      return data.user;
    } catch (error) {
      console.error('Login failed:', error.message, error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      console.log('Attempting registration with:', { email, passwordLength: password.length });
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error('Register error:', error, { code: error.code, status: error.status });
        throw error;
      }
      setUser(data.user);
      console.log('Registered user:', data.user);
      console.log('Session:', data.session);
      return data.user;
    } catch (error) {
      console.error('Register failed:', error.message, error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      setUser(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout failed:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { supabase };