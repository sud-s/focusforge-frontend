import React from 'react';
import { Plus } from 'lucide-react';
import HabitList from './HabitList';
import Button from '../common/Button';
import { useHabits } from '../../store/habitStore';
import { useUI } from '../../store/uiStore';
import Loader from '../common/Loader';

const HabitsPage = () => {
  const { habits, loading, deleteHabit } = useHabits();
  const { openModal } = useUI();

  const handleLogHabit = (habit) => {
    openModal('logHabit', habit);
  };

  const handleAddHabit = () => {
    openModal('createHabit');
  };

  const handleDeleteHabit = (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(id);
    }
  };

  const handleViewAnalytics = (habit) => {
    // TODO: Implement analytics modal or page
    console.log('View analytics for', habit.title);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Habits</h1>
          <p className="text-gray">Track your daily routines and build consistency.</p>
        </div>
        <Button onClick={handleAddHabit} icon={Plus}>Add Habit</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <HabitList 
          habits={habits} 
          onLog={handleLogHabit} 
          onDelete={handleDeleteHabit} 
          onViewAnalytics={handleViewAnalytics}
        />
      )}
    </div>
  );
};

export default HabitsPage;
