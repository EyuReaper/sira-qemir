import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Environment variable checks
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Use a more descriptive error for development
  console.error('Environment Variables Missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set.');
  throw new Error('Supabase environment variables are missing. Please check your .env file and ensure they are correctly loaded.');
}

// Supabase client initialization
// The `auth` options `persistSession: true` and `autoRefreshToken: true` are key for remembering users.
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage, // Explicitly use localStorage (default for web, but good to be clear)
    persistSession: true, // This is crucial for remembering users across browser restarts/refreshes
    autoRefreshToken: true, // Automatically refreshes the session token
    detectSessionInUrl: true, // Handles session detection from URL callbacks (e.g., magic links)
  },
});

const AuthContext = createContext(undefined); // Explicitly set initial context value to undefined

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tracks initial session loading

  useEffect(() => {
    // Function to get the initial session and set up the listener
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('AuthContext: Error fetching initial session:', error.message);
          // Don't throw here, just log and proceed without a user
        }
        setUser(session?.user || null); // Set user based on initial session
      } catch (err) {
        console.error('AuthContext: Failed to get initial session:', err.message);
        setUser(null); // Ensure user is null on error
      } finally {
        setLoading(false); // Mark loading as complete regardless of outcome
      }
    };

    getInitialSession(); // Call immediately when component mounts

    // Set up real-time auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // _event can be 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', 'USER_UPDATED'
      console.log('Auth State Change Event:', _event, 'Session:', session);
      setUser(session?.user || null); // Always update user state based on the latest session

      // Optional: More detailed logging
      if (session?.access_token) {
        // console.log('AuthContext: JWT received/refreshed');
      } else if (!session && _event === 'SIGNED_OUT') {
        console.log('AuthContext: User explicitly signed out, session cleared.');
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
      console.log('AuthContext: Auth state listener unsubscribed.');
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Helper function to provide more user-friendly error messages
  const getFriendlyErrorMessage = (error) => {
    if (!error) return 'An unexpected error occurred.';
    if (typeof error === 'string') return error;

    // Supabase specific error messages often have a 'message' property
    if (error.message) {
      if (error.message.includes('Invalid login credentials')) {
        return 'Invalid email or password. Please try again.';
      }
      if (error.message.includes('User already registered')) {
        return 'This email is already registered. Please login instead.';
      }
      if (error.message.includes('Email not confirmed')) {
        return 'Please confirm your email address to log in.';
      }
      if (error.message.includes('Too many requests')) {
        return 'Too many login attempts. Please wait a moment and try again.';
      }
      return error.message; // Fallback to original message
    }
    return 'An unknown error occurred during authentication.';
  };

  const login = async (email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      console.log('AuthContext: Attempting login for:', normalizedEmail);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        console.error('AuthContext: Login error details:', error.message, error.status, error.code);
        return { success: false, error: getFriendlyErrorMessage(error) };
      }

      // Supabase's onAuthStateChange listener will handle setting the user state.
      // We can return the user data directly here for immediate use in the component.
      console.log('AuthContext: Login successful for user:', data.user?.email);
      return { success: true, user: data.user };

    } catch (err) {
      // This catch block handles network errors or unexpected issues
      console.error('AuthContext: General login failure:', err.message, err);
      return { success: false, error: getFriendlyErrorMessage(err) };
    }
  };

  const register = async (email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      console.log('AuthContext: Attempting registration for:', normalizedEmail);
      const { data, error } = await supabase.auth.signUp({ email: normalizedEmail, password });

      if (error) {
        console.error('AuthContext: Register error details:', error.message, error.status, error.code);
        return { success: false, error: getFriendlyErrorMessage(error) };
      }

      // Supabase signUp with email/password flow:
      // If email confirmation is required, `data.user` might be null until confirmed.
      // `onAuthStateChange` will eventually update the user when confirmed.
      console.log('AuthContext: Registration initiated for user:', data.user?.email, 'Confirmation required:', !data.session);
      let successMessage = 'Registration successful! Please check your email to confirm your account.';
      if (data.session) {
        // If session is immediately available (e.g., email confirmation not required or already confirmed)
        successMessage = 'Registration successful!';
      }
      return { success: true, user: data.user, message: successMessage };

    } catch (err) {
      console.error('AuthContext: General registration failure:', err.message, err);
      return { success: false, error: getFriendlyErrorMessage(err) };
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext: Attempting logout.');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthContext: Logout error details:', error.message);
        return { success: false, error: getFriendlyErrorMessage(error) };
      }
      // setUser(null) is handled by onAuthStateChange listener on SIGNED_OUT event.
      console.log('AuthContext: Logout successful.');
      return { success: true };
    } catch (err) {
      console.error('AuthContext: General logout failure:', err.message, err);
      return { success: false, error: getFriendlyErrorMessage(err) };
    }
  };

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo(() => ({
    user,
    login,
    register,
    logout,
    loading,
  }), [user, loading]); // Depend on user and loading state

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}

export { supabase };