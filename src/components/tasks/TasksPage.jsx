import React from 'react';
import { Plus } from 'lucide-react';
import TaskList from './TaskList';
import Button from '../common/Button';
import { useTasks } from '../../store/taskStore';
import { useUI } from '../../store/uiStore';
import Loader from '../common/Loader';

const TasksPage = () => {
  const { tasks, loading, toggleTask, markTaskMissed, deleteTask } = useTasks();
  const { openModal } = useUI();

  const handleAddTask = () => {
    openModal('createTask');
  };

  const handleToggleTask = (id) => {
    // Task can only be completed on its due_date
    toggleTask(id);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-normal text-zinc-700 dark:text-zinc-200">Tasks</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{todayFormatted}</p>
        </div>
        <Button onClick={handleAddTask} icon={Plus}>Add</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <TaskList 
          tasks={tasks} 
          onToggle={handleToggleTask} 
          onDelete={handleDeleteTask} 
        />
      )}
    </div>
  );
};

export default TasksPage;
