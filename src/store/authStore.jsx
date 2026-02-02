import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize auth from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const userData = await authApi.getMe();
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // authApi.login returns data directly because axiosClient interceptors unwrap .data
      const data = await authApi.login({ email, password });
      
      // Save token
      localStorage.setItem('token', data.access_token);

      // Fetch user info
      const userData = await authApi.getMe();
      setUser(userData);
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.register({ username, email, password });

      localStorage.setItem('token', data.access_token);

      const userData = await authApi.getMe();
      setUser(userData);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
