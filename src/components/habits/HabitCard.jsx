import React from 'react';
import { Flame, Check, X, Trash2, BarChart2, History, Clock } from 'lucide-react';
import Button from '../common/Button';
import '../../styles/cards.css';

const HabitCard = ({ habit, onLog, onMiss, onDelete, onViewAnalytics, onLogDate }) => {
  // Use name from backend, fallback to title for compatibility
  const habitName = habit.name || habit.title || 'Unnamed Habit';
  const streak = habit.current_streak || habit.streak || 0;
  const progress = habit.progress || 0;
  const completedToday = habit.completedToday || false;
  const missedToday = habit.missedToday || false;
  const completedYesterday = habit.completedYesterday;

  // Format due/completion date
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const completedAt = habit.completed_at || habit.completedAt;
  const dueDate = habit.due_date || habit.dueDate;

  // Status icons
  const getStatusIcon = () => {
    if (completedToday && !missedToday) {
      return <Check size={20} />;
    }
    if (missedToday) {
      return <X size={20} />;
    }
    return <Flame size={20} />;
  };

  // Status color
  const getStatusColor = () => {
    if (completedToday && !missedToday) {
      return 'bg-success/20 text-success';
    }
    if (missedToday) {
      return 'bg-danger/20 text-danger';
    }
    return 'bg-orange-100 text-orange-500';
  };

  // Status message
  const getStatusMessage = () => {
    if (completedToday && !missedToday) {
      return 'Completed Today';
    }
    if (missedToday) {
      return 'Missed Today';
    }
    return `${streak} Day Streak`;
  };

  return (
    <div className={`card ${completedToday ? 'border-2 border-success' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getStatusColor()}`}>
            {getStatusIcon()}
          </div>
          <div>
            <h3 className="font-bold text-lg">{habitName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray">
              <Flame size={14} className={streak > 0 ? 'text-orange-500' : 'text-gray-400'} />
              <span>{getStatusMessage()}</span>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-400">
          {progress}%
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            completedToday ? 'bg-success' : 
            missedToday ? 'bg-danger' :
            'bg-primary'
          }`}
          style={{ width: `${progress}%`, backgroundColor: 'var(--primary-color)' }}
        ></div>
      </div>
      
      {/* Due Date / Completion Time */}
      {completedAt && (
        <div className="mb-3 p-2 bg-success/10 rounded-lg flex items-center gap-2 text-xs text-success">
          <Clock size={12} />
          Completed: {formatDate(completedAt)}
        </div>
      )}
      
      {dueDate && !completedAt && (
        <div className="mb-3 p-2 bg-gray-100 rounded-lg flex items-center gap-2 text-xs text-gray-500">
          <Clock size={12} />
          Due: {formatDate(dueDate)}
        </div>
      )}
      
      {/* Yesterday's Status */}
      {completedYesterday !== undefined && completedYesterday !== null && (
        <div className={`mb-4 p-2 rounded-lg text-xs flex items-center gap-2 ${
          completedYesterday ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
        }`}>
          <History size={12} />
          {completedYesterday ? '✅ Completed yesterday' : '❌ Missed yesterday'}
        </div>
      )}
      
      <div className="flex justify-between items-center mt-auto">
        {!completedToday && !missedToday ? (
          <div className="flex gap-2">
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onLog(habit)}
            >
              <Check size={16} className="mr-1" />
              Complete
            </Button>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => onMiss(habit)}
            >
              <X size={16} className="mr-1" />
              Missed
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLogDate(habit)}
            >
              <History size={16} className="mr-1" />
              Log Date
            </Button>
          </div>
        ) : completedToday ? (
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              disabled={true}
            >
              <Check size={16} className="mr-1" />
              Completed
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLogDate(habit)}
            >
              <History size={16} className="mr-1" />
              Log Date
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              disabled={true}
            >
              <X size={16} className="mr-1" />
              Missed Today
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLogDate(habit)}
            >
              <History size={16} className="mr-1" />
              Log Date
            </Button>
          </div>
        )}
        
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
