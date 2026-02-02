import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (!tasks.length) {
    return <div className="text-center py-10 text-gray">No tasks found.</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
