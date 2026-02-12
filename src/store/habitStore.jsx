import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import habitApi from '../api/habitApi';
import { useAuth } from './authStore';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ALWAYS fetch from backend - NO localStorage for habit state
  const fetchHabits = useCallback(async () => {
    if (!user) {
      setHabits([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const data = await habitApi.getAll();
      setHabits(data);
      console.log('[HabitStore] Fetched habits from backend:', data);
    } catch (err) {
      console.error('[HabitStore] Failed to fetch habits:', err);
      setError(err.message);
      setHabits([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addHabit = async (habitData) => {
    setLoading(true);
    setError(null);
    try {
      const newHabit = await habitApi.create(habitData);
      console.log('[HabitStore] Created habit:', newHabit);
      // Refetch to get updated list from backend
      await fetchHabits();
      return newHabit;
    } catch (err) {
      console.error('[HabitStore] Failed to create habit:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await habitApi.delete(id);
      console.log('[HabitStore] Deleted habit:', id);
      // Refetch to get updated list from backend
      await fetchHabits();
    } catch (err) {
      console.error('[HabitStore] Failed to delete habit:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logHabit = async (id, dateStr = null, timeStr = null) => {
    setLoading(true);
    setError(null);
    try {
      console.log('[HabitStore] Logging habit:', id, 'date:', dateStr, 'time:', timeStr);
      const result = await habitApi.log(id, dateStr, timeStr);
      console.log('[HabitStore] Log result:', result);
      // ALWAYS refetch from backend after logging
      await fetchHabits();
      return result;
    } catch (err) {
      console.error('[HabitStore] Failed to log habit:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const missHabit = async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log('[HabitStore] Marking habit as missed:', id);
      const result = await habitApi.miss(id);
      console.log('[HabitStore] Miss result:', result);
      // ALWAYS refetch from backend after marking missed
      await fetchHabits();
      return result;
    } catch (err) {
      console.error('[HabitStore] Failed to mark habit as missed:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // AI Coach methods
  const fetchAIWelcome = async () => {
    try {
      const data = await habitApi.getAIWelcome();
      return data;
    } catch (err) {
      console.error('[HabitStore] Failed to fetch AI welcome:', err);
      return null;
    }
  };

  const fetchAISuggestions = async (habitId) => {
    try {
      const data = await habitApi.getAISuggestions(habitId);
      return data;
    } catch (err) {
      console.error('[HabitStore] Failed to fetch AI suggestions:', err);
      return null;
    }
  };

  const fetchAIPrediction = async (habitId) => {
    try {
      const data = await habitApi.predict(habitId);
      return data;
    } catch (err) {
      console.error('[HabitStore] Failed to fetch AI prediction:', err);
      return null;
    }
  };

  const fetchAIStats = async (habitId) => {
    try {
      const data = await habitApi.getAIStats(habitId);
      return data;
    } catch (err) {
      console.error('[HabitStore] Failed to fetch AI stats:', err);
      return null;
    }
  };

  // Fetch habits when user changes
  useEffect(() => {
    if (user) {
      console.log('[HabitStore] User changed, fetching habits...');
      fetchHabits();
    } else {
      setHabits([]);
    }
  }, [user, fetchHabits]);

  return (
    <HabitContext.Provider value={{ 
      habits, 
      loading, 
      error,
      addHabit, 
      deleteHabit, 
      fetchHabits, 
      logHabit,
      missHabit,
      fetchAIWelcome,
      fetchAISuggestions,
      fetchAIPrediction,
      fetchAIStats
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
