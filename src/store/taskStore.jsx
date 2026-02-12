import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import taskApi from '../api/taskApi';
import { useAuth } from './authStore';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await taskApi.getAll();
      setTasks(data);
      console.log('[TaskStore] Fetched all tasks:', data);
    } catch (err) {
      console.error('[TaskStore] Failed to fetch tasks:', err);
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch today's tasks
  const fetchTodayTasks = useCallback(async () => {
    if (!user) {
      setTodayTasks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await taskApi.getToday();
      setTodayTasks(data);
      console.log('[TaskStore] Fetched today\'s tasks:', data);
    } catch (err) {
      console.error('[TaskStore] Failed to fetch today\'s tasks:', err);
      setError(err.message);
      setTodayTasks([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Create task - user provides due_date, system auto-categorizes
  const addTask = async (taskData) => {
    if (!taskData.due_date) {
      throw new Error('due_date is required');
    }
    setLoading(true);
    setError(null);
    try {
      const newTask = await taskApi.create(taskData);
      console.log('[TaskStore] Created task:', newTask);
      await fetchTasks();
      await fetchTodayTasks();
      return newTask;
    } catch (err) {
      console.error('[TaskStore] Failed to create task:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle completion - refetch from backend
  const toggleTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.complete(id);
      console.log('[TaskStore] Completed task:', id);
      await fetchTasks();
      await fetchTodayTasks();
    } catch (err) {
      console.error('[TaskStore] Failed to complete task:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Uncomplete/reopen a task
  const uncompleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.uncomplete(id);
      console.log('[TaskStore] Uncompleted task:', id);
      await fetchTasks();
      await fetchTodayTasks();
    } catch (err) {
      console.error('[TaskStore] Failed to uncomplete task:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mark task as missed
  const markTaskMissed = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.markMissed(id);
      console.log('[TaskStore] Marked task as missed:', id);
      await fetchTasks();
      await fetchTodayTasks();
    } catch (err) {
      console.error('[TaskStore] Failed to mark task as missed:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.delete(id);
      console.log('[TaskStore] Deleted task:', id);
      await fetchTasks();
      await fetchTodayTasks();
    } catch (err) {
      console.error('[TaskStore] Failed to delete task:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when user changes
  useEffect(() => {
    if (user) {
      console.log('[TaskStore] User changed, fetching tasks...');
      fetchTasks();
      fetchTodayTasks();
    } else {
      setTasks([]);
      setTodayTasks([]);
    }
  }, [user, fetchTasks, fetchTodayTasks]);

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      todayTasks,
      loading, 
      error, 
      addTask, 
      toggleTask,
      uncompleteTask,
      markTaskMissed,
      deleteTask, 
      fetchTasks,
      fetchTodayTasks 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
