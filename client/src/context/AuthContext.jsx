import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Placeholder for Supabase auth (to be implemented in Step 3)
  useEffect(() => {
    // Check for auth token or session
    setUser(null); // Update with real user data later
  }, []);

  const login = async (email, password) => {
    // API call to Supabase auth
    console.log('Login:', { email, password });
    setUser({ email }); // Placeholder
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}