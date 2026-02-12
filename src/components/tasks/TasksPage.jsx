import React from 'react';
import { Plus } from 'lucide-react';
import TaskList from './TaskList';
import Button from '../common/Button';
import { useTasks } from '../../store/taskStore';
import { useUI } from '../../store/uiStore';
import Loader from '../common/Loader';

const TasksPage = () => {
  const { tasks, loading, toggleTask, uncompleteTask, markTaskMissed, deleteTask } = useTasks();
  const { openModal } = useUI();

  const handleAddTask = () => {
    openModal('createTask');
  };

  const handleToggleTask = (id) => {
    // Find the task to see if it's completed
    const task = tasks.find(t => (t.id || t._id) === id);
    if (task) {
      if (task.is_completed) {
        // Reopen the task
        uncompleteTask(id);
      } else {
        // Complete the task
        toggleTask(id);
      }
    }
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  // Get today's date formatted
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
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <p className="text-gray">{todayFormatted}</p>
        </div>
        <Button onClick={handleAddTask} icon={Plus}>Add Task</Button>
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
