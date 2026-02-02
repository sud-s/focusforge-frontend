import React, { createContext, useContext, useState, useEffect } from 'react';
import taskApi from '../api/taskApi';
import { useAuth } from './authStore';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
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
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error('Add Task Error:', err);
      setError(err.response?.data?.message || err.message);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const newCompletedStatus = !task.completed;
    
    try {
      await taskApi.update(id, { 
        completed: newCompletedStatus,
        completedAt: newCompletedStatus ? new Date().toISOString() : null
      });
      // Optimistically update
      setTasks(tasks.map(t => 
        t.id === id ? { 
          ...t, 
          completed: newCompletedStatus,
          completedAt: newCompletedStatus ? new Date().toISOString() : null
        } : t
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.delete(id);
      setTasks(tasks.filter(t => t.id !== id));
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
