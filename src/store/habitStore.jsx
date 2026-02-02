import React, { createContext, useContext, useState, useEffect } from 'react';
import habitApi from '../api/habitApi';
import { useAuth } from './authStore';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [aiWelcome, setAiWelcome] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const data = await habitApi.getAll();
      setHabits(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await habitApi.delete(id);
      setHabits(habits.filter(h => h.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const addHabit = async (habitData) => {
    try {
      console.log("Sending to backend:", habitData);
      const newHabit = await habitApi.create(habitData);
      console.log("Backend response:", newHabit);
      setHabits([...habits, newHabit]);
    } catch (err) {
      console.error("FULL ERROR:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
    }
  };

  const logHabit = async (id) => {
    try {
      await habitApi.log(id);
      // Optimistically update or re-fetch
      // Assuming log implies completion for today
      setHabits(habits.map(h => h.id === id ? { ...h, completedToday: true, streak: h.streak + 1 } : h));
    } catch (err) {
      setError(err.message);
    }
  };

  // AI Coach methods
  const fetchAIWelcome = async () => {
    try {
      const data = await habitApi.getAIWelcome();
      setAiWelcome(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch AI welcome:', err);
      return null;
    }
  };

  const fetchAISuggestions = async (habitId) => {
    try {
      const data = await habitApi.getAISuggestions(habitId);
      setAiSuggestions(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch AI suggestions:', err);
      return null;
    }
  };

  const fetchAIPrediction = async (habitId) => {
    try {
      const data = await habitApi.predict(habitId);
      return data;
    } catch (err) {
      console.error('Failed to fetch AI prediction:', err);
      return null;
    }
  };

  const fetchAIStats = async (habitId) => {
    try {
      const data = await habitApi.getAIStats(habitId);
      return data;
    } catch (err) {
      console.error('Failed to fetch AI stats:', err);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchHabits();
    } else {
      setHabits([]);
    }
  }, [user]);

  return (
    <HabitContext.Provider value={{ 
      habits, 
      loading, 
      error, 
      addHabit, 
      deleteHabit, 
      fetchHabits, 
      logHabit,
      aiWelcome,
      aiSuggestions,
      fetchAIWelcome,
      fetchAISuggestions,
      fetchAIPrediction,
      fetchAIStats
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
