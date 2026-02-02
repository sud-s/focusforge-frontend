import React from 'react';
import { Flame, Check, MoreVertical, Trash2, BarChart2 } from 'lucide-react';
import Button from '../common/Button';
import '../../styles/cards.css';

const HabitCard = ({ habit, onLog, onDelete, onViewAnalytics }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 text-orange-500 rounded-lg">
            <Flame size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{habit.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray">
              <Flame size={14} className="text-orange-500" />
              <span>{habit.streak} Day Streak</span>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-400">
          {habit.progress}%
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${habit.progress}%`, backgroundColor: 'var(--primary-color)' }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center mt-auto">
        <Button 
          variant={habit.completedToday ? "secondary" : "primary"} 
          size="sm" 
          onClick={() => onLog(habit)}
          disabled={habit.completedToday}
        >
          {habit.completedToday ? 'Completed' : 'Log Today'}
        </Button>
        
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-primary transition-colors" onClick={() => onViewAnalytics(habit)}>
            <BarChart2 size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" onClick={() => onDelete(habit.id)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
