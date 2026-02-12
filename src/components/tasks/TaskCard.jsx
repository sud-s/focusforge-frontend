import React from 'react';
import { CheckSquare, Calendar, Trash2, CheckCircle, Square, Clock } from 'lucide-react';
import '../../styles/cards.css';

const TaskCard = ({ task, onToggle, onDelete }) => {
  // Handle both id and _id from backend
  const taskId = task.id || task._id;
  
  // Handle both due_date and dueDate from backend
  const dueDateStr = task.due_date || task.dueDate;
  const dueTime = task.due_time || task.dueTime;
  const completedAt = task.completed_at || task.completedAt;
  const isCompleted = task.is_completed || task.completed || false;
  
  // Format date for display
  const formatDueDate = () => {
    if (!dueDateStr) return 'No due date';
    
    const date = new Date(dueDateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    let dateStr = '';
    if (isToday) {
      dateStr = 'Today';
    } else if (isTomorrow) {
      dateStr = 'Tomorrow';
    } else {
      dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric' 
      });
    }
    
    if (dueTime) {
      dateStr += ` at ${dueTime}`;
    }
    
    return dateStr;
  };
  
  // Check if task is overdue
  const isOverdue = () => {
    if (!dueDateStr || isCompleted) return false;
    const due = new Date(dueDateStr);
    const now = new Date();
    return due < now;
  };

  const getPriorityColor = (p) => {
    switch(p) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatCompletedDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="task-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: isCompleted ? '#f0fdf4' : 'var(--card-bg)',
        borderRadius: '12px',
        border: isOverdue() ? '1px solid #ef4444' : '1px solid var(--border-color)',
        marginBottom: '12px',
        opacity: isCompleted ? 0.7 : 1,
        transition: 'all 0.2s ease'
      }}
    >
      {/* Checkbox Button */}
      <button
        onClick={() => onToggle(taskId)}
        style={{
          width: '32px',
          height: '32px',
          minWidth: '32px',
          borderRadius: '8px',
          border: isCompleted ? 'none' : '2px solid #d1d5db',
          backgroundColor: isCompleted ? '#22c55e' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: isCompleted ? '0 2px 8px rgba(34, 197, 94, 0.4)' : 'none'
        }}
        title={isCompleted ? 'Mark as not done' : 'Mark as done'}
      >
        {isCompleted ? (
          <CheckSquare size={20} color="white" />
        ) : (
          <Square size={16} color="#9ca3af" />
        )}
      </button>
      
      {/* Task Content */}
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 500,
          margin: 0,
          color: isCompleted ? '#9ca3af' : '#1f2937',
          textDecoration: isCompleted ? 'line-through' : 'none'
        }}>
          {task.title}
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '8px',
          fontSize: '12px',
          flexWrap: 'wrap'
        }}>
          {/* Due Date/Time */}
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            color: isOverdue() ? '#ef4444' : '#6b7280',
            fontWeight: isOverdue() ? 600 : 400
          }}>
            <Calendar size={12} />
            {formatDueDate()}
          </span>
          
          {/* Priority Badge */}
          <span style={{
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'capitalize',
            backgroundColor: getPriorityColor(task.priority).split(' ')[0],
            color: getPriorityColor(task.priority).split(' ')[1]
          }}>
            {task.priority || 'medium'}
          </span>
          
          {/* Completion Info */}
          {isCompleted && completedAt && (
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              color: '#16a34a', 
              fontWeight: 500 
            }}>
              <CheckCircle size={12} />
              Done: {formatCompletedDate(completedAt)}
            </span>
          )}
          
          {/* Late Indicator */}
          {task.is_late && (
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              color: '#f59e0b',
              fontWeight: 500 
            }}>
              <Clock size={12} />
              {task.days_late} day{task.days_late > 1 ? 's' : ''} late
            </span>
          )}
        </div>
      </div>
      
      {/* Delete Button */}
      <button
        onClick={() => onDelete(taskId)}
        style={{
          padding: '8px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: 'transparent',
          color: '#9ca3af',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        title="Delete task"
        onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
        onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskCard;
