import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL or Anon Key is missing. Check .env file.');
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
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error.message, error);
          throw error;
        }
        setUser(session?.user ?? null);
        console.log('Current session:', session);
        if (session?.access_token) {
          console.log('JWT:', session.access_token);
        }
      } catch (error) {
        console.error('Session fetch failed:', error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      console.log('Auth state changed:', session);
      if (session?.access_token) {
        console.log('JWT:', session.access_token);
      } else if (!session) {
        console.log('No session, user cleared');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      console.log('Attempting login with:', { email: normalizedEmail, passwordLength: password.length });
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
      if (error) {
        console.error('Login error:', error.message, { code: error.code, status: error.status, details: error });
        throw error;
      }
      setUser(data.user);
      console.log('Logged in user:', data.user);
      console.log('Session:', data.session);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login failed:', error.message, error); // Line 63
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      console.log('Attempting registration with:', { email: normalizedEmail, passwordLength: password.length });
      const { data, error } = await supabase.auth.signUp({ email: normalizedEmail, password });
      if (error) {
        console.error('Register error:', error.message, { code: error.code, status: error.status, details: error });
        throw error;
      }
      setUser(data.user);
      console.log('Registered user:', data.user);
      console.log('Session:', data.session);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Register failed:', error.message, error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error.message, error);
        throw error;
      }
      setUser(null);
      console.log('User logged out');
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error.message, error);
      return { success: false, error: error.message };
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