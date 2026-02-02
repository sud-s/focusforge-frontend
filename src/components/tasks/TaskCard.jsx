import React from 'react';
import { CheckSquare, Calendar, Trash2, CheckCircle, Square } from 'lucide-react';
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
    <div 
      className="task-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: task.completed ? '#f0fdf4' : 'var(--card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        marginBottom: '12px',
        opacity: task.completed ? 0.7 : 1,
        transition: 'all 0.2s ease'
      }}
    >
      {/* Checkbox Button */}
      <button
        onClick={() => onToggle(task.id)}
        style={{
          width: '32px',
          height: '32px',
          minWidth: '32px',
          borderRadius: '8px',
          border: task.completed ? 'none' : '2px solid #d1d5db',
          backgroundColor: task.completed ? '#22c55e' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: task.completed ? '0 2px 8px rgba(34, 197, 94, 0.4)' : 'none'
        }}
        title={task.completed ? 'Mark as not done' : 'Mark as done'}
      >
        {task.completed ? (
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
          color: task.completed ? '#9ca3af' : '#1f2937',
          textDecoration: task.completed ? 'line-through' : 'none'
        }}>
          {task.title}
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '4px',
          fontSize: '12px',
          color: '#6b7280',
          flexWrap: 'wrap'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} />
            {task.dueDate || 'No due date'}
          </span>
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
          {task.completed && task.completedAt && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontWeight: 500 }}>
              <CheckCircle size={12} />
              Done: {formatDate(task.completedAt)}
            </span>
          )}
        </div>
      </div>
      
      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
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
