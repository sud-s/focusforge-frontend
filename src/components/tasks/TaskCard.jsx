import React from 'react';
import { CheckSquare, Calendar, Trash2, CheckCircle } from 'lucide-react';
import '../../styles/cards.css';

const TaskCard = ({ task, onToggle, onDelete }) => {
  const getPriorityColor = (p) => {
    switch(p) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`card flex items-center gap-4 p-4 ${task.completed ? 'opacity-75 bg-green-50' : ''}`}>
      <button 
        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors cursor-pointer
          ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-primary'}`}
        onClick={() => onToggle(task.id)}
      >
        {task.completed && <CheckSquare size={16} />}
      </button>
      
      <div className="flex-1">
        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {task.dueDate || 'No due date'}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${getPriorityColor(task.priority)}`}>
            {task.priority || 'medium'}
          </span>
          {task.completed && task.completedAt && (
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle size={12} />
              Completed: {formatDate(task.completedAt)}
            </span>
          )}
        </div>
      </div>
      
      <button 
        className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer" 
        onClick={() => onDelete(task.id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskCard;
