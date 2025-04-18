import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const AuthContext = createContext(null);
const USER_STORAGE_KEY = 'auth_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Persist user state to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login with role based on email
      const isAdmin = email.includes('admin');
      const newUser = {
        name: isAdmin ? 'Admin User' : 'Test User',
        email: email,
        role: isAdmin ? 'admin' : 'citizen'
      };
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);  // Clear from localStorage on logout
  };

  // Memoize the context value
  const value = useMemo(() => ({
    user,
    isLoading,
    login,
    logout
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
