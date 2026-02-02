import React, { createContext, useContext, useState, useEffect } from 'react';
import taskApi from '../api/taskApi';
import { useAuth } from './authStore';

const TaskContext = createContext();

// Helper functions for localStorage persistence
const getStoredTasks = (userId) => {
  try {
    const stored = localStorage.getItem(`focusforge_tasks_${userId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const storeTasks = (userId, tasks) => {
  try {
    localStorage.setItem(`focusforge_tasks_${userId}`, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Failed to store tasks in localStorage:', e);
  }
};

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getAll();
      // Merge with localStorage to preserve completed status
      const storedTasks = user ? getStoredTasks(user.id) : [];
      const mergedTasks = data.map(task => {
        const stored = storedTasks.find(st => st.id === task.id);
        return stored ? { ...task, completed: stored.completed, completedAt: stored.completedAt } : task;
      });
      setTasks(mergedTasks);
      if (user) storeTasks(user.id, mergedTasks);
      setError(null);
    } catch (err) {
      // Fallback to localStorage if API fails
      const storedTasks = user ? getStoredTasks(user.id) : [];
      setTasks(storedTasks);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      console.log('Adding task:', taskData);
      const newTask = await taskApi.create(taskData);
      console.log('Task created:', newTask);
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      if (user) storeTasks(user.id, updatedTasks);
    } catch (err) {
      console.error('Add Task Error:', err);
      setError(err.response?.data?.message || err.message);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const newCompletedStatus = !task.completed;
    const completedAt = newCompletedStatus ? (task.completedAt || new Date().toISOString()) : null;
    
    // Optimistically update
    const updatedTasks = tasks.map(t => 
      t.id === id ? { 
        ...t, 
        completed: newCompletedStatus,
        completedAt: completedAt
      } : t
    );
    setTasks(updatedTasks);
    
    // Persist to localStorage
    if (user) storeTasks(user.id, updatedTasks);
    
    try {
      // Try to update backend
      await taskApi.update(id, { 
        completed: newCompletedStatus,
        completedAt: completedAt
      });
    } catch (err) {
      console.warn('Backend update failed, but localStorage updated:', err.message);
      // localStorage already has the update, so we're good
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.delete(id);
      const updatedTasks = tasks.filter(t => t.id !== id);
      setTasks(updatedTasks);
      if (user) storeTasks(user.id, updatedTasks);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, toggleTask, deleteTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
