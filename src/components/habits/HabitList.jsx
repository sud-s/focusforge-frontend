import React from 'react';
import HabitCard from './HabitCard';

const HabitList = ({ habits, onLog, onDelete, onViewAnalytics }) => {
  if (!habits.length) {
    return <div className="text-center py-10 text-gray">No habits yet. Start by adding one!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {habits.map(habit => (
        <HabitCard 
          key={habit.id} 
          habit={habit} 
          onLog={onLog} 
          onDelete={onDelete} 
          onViewAnalytics={onViewAnalytics} 
        />
      ))}
    </div>
  );
};

export default HabitList;
